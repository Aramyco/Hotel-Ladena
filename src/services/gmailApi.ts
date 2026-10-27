export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  internalDate?: string;
  unread?: boolean;
}

export interface GmailMessageDetail extends GmailMessageSummary {
  bodyText?: string;
  bodyHtml?: string;
}

// Convert string to base64url encoding for Gmail API
const toBase64Url = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const decodeBase64Url = (str: string): string => {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (err) {
    return str;
  }
};

export const listGmailMessages = async (
  accessToken: string,
  query: string = '',
  maxResults: number = 10
): Promise<GmailMessageSummary[]> => {
  const params = new URLSearchParams({
    maxResults: maxResults.toString(),
  });
  if (query) {
    params.append('q', query);
  }

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gagal memuat pesan Gmail: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  const messages = data.messages || [];

  // Fetch summaries for the first batch
  const summaries: GmailMessageSummary[] = await Promise.all(
    messages.slice(0, 10).map(async (msg: { id: string; threadId: string }) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!detailRes.ok) return { id: msg.id, threadId: msg.threadId };

        const detail = await detailRes.json();
        const headers = detail.payload?.headers || [];
        const getHeader = (name: string) =>
          headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

        const labelIds = detail.labelIds || [];
        const isUnread = labelIds.includes('UNREAD');

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: detail.snippet,
          subject: getHeader('Subject') || '(Tanpa Subjek)',
          from: getHeader('From'),
          to: getHeader('To'),
          date: getHeader('Date'),
          unread: isUnread,
        };
      } catch (e) {
        return { id: msg.id, threadId: msg.threadId };
      }
    })
  );

  return summaries;
};

export const getGmailMessageDetail = async (
  accessToken: string,
  messageId: string
): Promise<GmailMessageDetail> => {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Gagal mengambil detail email: ${res.statusText}`);
  }

  const data = await res.json();
  const headers = data.payload?.headers || [];
  const getHeader = (name: string) =>
    headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

  let bodyText = '';
  let bodyHtml = '';

  const extractBody = (part: any) => {
    if (part.mimeType === 'text/plain' && part.body?.data) {
      bodyText += decodeBase64Url(part.body.data);
    } else if (part.mimeType === 'text/html' && part.body?.data) {
      bodyHtml += decodeBase64Url(part.body.data);
    } else if (part.parts && Array.isArray(part.parts)) {
      part.parts.forEach(extractBody);
    }
  };

  if (data.payload) {
    extractBody(data.payload);
  }

  return {
    id: data.id,
    threadId: data.threadId,
    snippet: data.snippet,
    subject: getHeader('Subject') || '(Tanpa Subjek)',
    from: getHeader('From'),
    to: getHeader('To'),
    date: getHeader('Date'),
    bodyText: bodyText || data.snippet,
    bodyHtml: bodyHtml,
  };
};

export const sendGmailMessage = async (
  accessToken: string,
  params: {
    to: string;
    subject: string;
    body: string;
  }
): Promise<{ id: string; threadId: string }> => {
  const { to, subject, body } = params;

  // Build clean RFC 2822 email format
  const emailLines = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    body,
  ];
  const emailContent = emailLines.join('\r\n');
  const rawBase64 = toBase64Url(emailContent);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: rawBase64,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gagal mengirim email: ${res.status} ${errorText}`);
  }

  return await res.json();
};

export const trashGmailMessage = async (
  accessToken: string,
  messageId: string
): Promise<void> => {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Gagal memindahkan email ke sampah: ${res.statusText}`);
  }
};
