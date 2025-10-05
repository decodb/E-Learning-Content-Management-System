export interface FileRecord {
  id: number;
  title: string;
  type: string,
  url: string;
  size: string;
  uploaded_at: string;
  is_active: boolean;
}

export interface FileRecordsData {
  currentPage: number;
  totalFiles: number;
  totalPages: number;
  files: FileRecord[];
}