'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export function ResumeUpload({ onUpload }: { onUpload: (file: File) => void }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(1);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploading(true);
        // Simulate upload progress
        let progress = 1;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            progress = 100;
          }

          setProgress(progress);
          if (progress === 100) {
            clearInterval(interval);
            setUploading(false);
            onUpload(file);
            toast.success('Resume uploaded successfully!');
          }
        }, 100);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 3 * 1024 * 1024,
    onDropRejected: () => {
      toast.error('Invalid file format or file size exceeds 3MB');
    },
  });

  return (
    <div
      {...getRootProps()}
      className="glassmorphism p-10 text-center cursor-pointer transition-all hover:bg-opacity-10"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        {uploading ? (
          <>
            <FileText className="w-52 h-12 text-primary animate-pulse" />
            <Progress value={progress} max={100} className="w-[60%]" />
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-primary" />
            <h3 className="text-lg font-semibold">
              {isDragActive
                ? 'Drop your resume here'
                : 'Drag & drop your resume or click to browse'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Supports PDF files up to 3MB
            </p>
            <Button variant="secondary">Select File</Button>
          </>
        )}
      </div>
    </div>
  );
}
