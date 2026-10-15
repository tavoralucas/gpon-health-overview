// T-017: Attachment list component

import { useState, useEffect } from 'react';
import { getSignedUrl } from '@/lib/storage';

interface Attachment {
  id: string;
  nome_arquivo: string;
  tamanho_bytes: number;
  content_type: string;
  storage_path: string;
  created_at: string;
}

interface AttachmentListProps {
  attachments: Attachment[];
}

export function AttachmentList({ attachments }: AttachmentListProps) {
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [loadingUrls, setLoadingUrls] = useState(true);

  useEffect(() => {
    async function loadUrls() {
      const urls: Record<string, string> = {};
      for (const att of attachments) {
        const url = await getSignedUrl(att.storage_path);
        if (url) {
          urls[att.id] = url;
        }
      }
      setSignedUrls(urls);
      setLoadingUrls(false);
    }
    loadUrls();
  }, [attachments]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (attachments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Arquivos anexados</h4>
      <ul className="space-y-2">
        {attachments.map((att) => (
          <li key={att.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-sm">{att.nome_arquivo}</span>
              <span className="text-xs text-muted-foreground">
                ({formatSize(att.tamanho_bytes)})
              </span>
            </div>
            <a
              href={signedUrls[att.id]}
              download={att.nome_arquivo}
              className="text-sm text-blue-600 hover:underline"
              onClick={(e) => {
                if (!signedUrls[att.id]) {
                  e.preventDefault();
                }
              }}
            >
              {loadingUrls ? 'Carregando...' : 'Download'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
