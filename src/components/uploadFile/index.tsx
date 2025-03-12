import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Upload, X } from 'lucide-react' // Added X icon for remove functionality
import { useState } from 'react'
import Button from '../button' // Assuming this is your custom Button component
import Input from '../input' // Assuming this is your custom Input component

type TFileUpload = {
  onClose: () => void
}

export const FileUpload = ({ onClose }: TFileUpload) => {
  const [files, setFiles] = useState<File[]>([]) // State to store selected files
  const [isDragging, setIsDragging] = useState(false) // State to track drag status
  const [isUploading, setIsUploading] = useState(false) // State to track upload status

  // Handle when files are selected through input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles]) // Add new files to existing list
    }
  }

  // Handle when files are dropped in the drop zone
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false) // Reset dragging state
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles]) // Add dropped files to list
    }
  }

  // Handle when files are dragged over the drop zone
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true) // Set dragging state to true
  }

  // Handle when dragging leaves the drop zone
  const handleDragLeave = () => {
    setIsDragging(false) // Reset dragging state
  }

  // Handle removing a specific file from the list
  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove)) // Remove file at specified index
  }

  // Handle upload when button is clicked (simulated with async delay)
  const handleUpload = async () => {
    if (files.length > 0) {
      setIsUploading(true) // Show loading overlay
      try {
        // Simulate upload process (replace with actual API call)
        console.log('Uploading files:', files)
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate 2-second upload
        setFiles([]) // Reset files after successful upload
        onClose()
      } catch (error) {
        console.error('Upload failed:', error)
      } finally {
        setIsUploading(false) // Hide loading overlay
      }
    }
  }

  const getUploadButtonTitle = () => {
    if (isUploading) return 'Uploading...'
    const suffix = files.length !== 1 ? 's' : ''
    return `Upload ${files.length} File${suffix}`
  }

  return (
    <div className="relative">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Drag and drop files or click to select
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Drop zone for file upload */}
          <div
            className={`rounded-lg border-2 border-dashed p-6 text-center ${
              isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragging ?
                'Drop files here'
              : 'Drag files here or click to select'}
            </p>

            {/* Hidden file input triggered by button */}
            <div className="mt-4">
              <Label htmlFor="file-upload" className="sr-only">
                Upload files
              </Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading} // Disable input during upload
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                title="Select Files"
                disabled={isUploading} // Disable button during upload
              />
            </div>
          </div>

          {/* Display selected files with remove option */}
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">
                Selected Files:
              </h4>
              <ul className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm text-gray-600"
                  >
                    <span>
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                    {/* Remove file button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 gap-0 px-2 hover:bg-red-100"
                      onClick={() => handleRemoveFile(index)}
                      disabled={isUploading} // Disable remove during upload
                      leftIcon={<X className="h-4 w-4 text-red-500" />}
                    />
                  </li>
                ))}
              </ul>
              {/* Upload button */}
              <Button
                className="mt-4 w-full"
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading} // Disable during upload
                title={getUploadButtonTitle()}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading overlay */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-500 bg-opacity-50">
          <div className="flex flex-col items-center gap-2">
            {/* Spinner */}
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-white">Uploading...</span>
          </div>
        </div>
      )}
    </div>
  )
}
