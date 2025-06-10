
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DocumentUploadModal } from '@/components/documents/DocumentUploadModal';
import { DocumentDownloadModal } from '@/components/documents/DocumentDownloadModal';
import { FileText, Download, Upload, ChevronDown } from 'lucide-react';

interface DocumentsDropdownProps {
  reservationId: string;
  reservationCode: string;
  clientName: string;
}

export const DocumentsDropdown: React.FC<DocumentsDropdownProps> = ({
  reservationId,
  reservationCode,
  clientName
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Documente
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => setShowDownloadModal(true)}>
            <Download className="w-4 h-4 mr-2" />
            Descarcă documente
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowUploadModal(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Încarcă documente completate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        reservationId={reservationId}
        reservationCode={reservationCode}
      />

      <DocumentDownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        reservationCode={reservationCode}
        clientName={clientName}
      />
    </>
  );
};
