
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload as UploadIcon } from 'lucide-react';
import { toast } from 'sonner';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast.error('Please select a video file to upload');
      return;
    }
    
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      toast.success('Video uploaded successfully!');
      setUploading(false);
      // Reset form or redirect
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="max-w-screen-md mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Upload Video</CardTitle>
            <CardDescription>
              Share your videos with the VideoVerse community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video">Video File</Label>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 flex flex-col items-center justify-center">
                    <UploadIcon className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {videoFile ? videoFile.name : 'Drag and drop your video here, or click to browse'}
                    </p>
                    <Input 
                      id="video" 
                      type="file" 
                      className="hidden" 
                      onChange={handleVideoChange}
                      accept="video/*"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('video')?.click()}
                    >
                      Select File
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Video title" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Tell viewers about your video" 
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Custom Thumbnail</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input 
                        id="thumbnail" 
                        type="file" 
                        className="hidden" 
                        onChange={handleThumbnailChange}
                        accept="image/*"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => document.getElementById('thumbnail')?.click()}
                      >
                        {thumbnailFile ? 'Change Thumbnail' : 'Upload Thumbnail'}
                      </Button>
                    </div>
                    {thumbnailPreview && (
                      <div className="w-32 h-20 rounded overflow-hidden bg-muted">
                        <img 
                          src={thumbnailPreview} 
                          alt="Thumbnail Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-youtube-red hover:bg-red-700"
                  disabled={uploading || !videoFile}
                >
                  {uploading ? 'Uploading...' : 'Upload Video'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Upload;
