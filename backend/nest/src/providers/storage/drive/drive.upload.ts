import { google } from 'googleapis';
import { Credentials } from 'google-auth-library';
import { Readable } from 'stream';

export class GoogleDriveUploader {
    private readonly drive;

    constructor(private readonly credentials: Credentials) {
        const keyFilePath = 'src/providers/storage/drive/keydrive.json';
        const auth = new google.auth.JWT({
            keyFile: keyFilePath,
            scopes: 'https://www.googleapis.com/auth/drive',
        });
 
        this.drive = google.drive({ version: 'v3', auth });
    }

    async uploadVideo(
        fileStream: Readable,
        fileName: string,
        folderId: string,
    ): Promise<string> {
        try {
            const videoMetadata = {
                name: fileName,
                parents: [folderId],
            };
            
            const response = await this.drive.files.create({
                requestBody: videoMetadata,
                media: {
                    mimeType: 'video/*',
                    body: fileStream,
                },
                fields: 'id',
            });

            const fileId = response.data.id;

            await this.drive.files.update({
                fileId: fileId,
                requestBody: { name: fileId },
            });

            return fileId;
        } catch (error) {
            console.error('Error uploading video to Google Drive:', error);
            throw error;
        }
    }

    async uploadImage(
        fileStream: Readable,
        fileName: string,
        folderId: string,
    ): Promise<string> {
        try {
            const imageMetadata = {
                name: fileName,
                parents: [folderId],
            };

            const response = await this.drive.files.create({
                requestBody: imageMetadata,
                media: {
                    mimeType: 'image/*',
                    body: fileStream,
                },
                fields: 'id',
            });

            const fileId = response.data.id;

            await this.drive.files.update({
                fileId: fileId,
                requestBody: { name: fileId },
            });

            return fileId;
        } catch (error) {
            console.error('Error uploading image to Google Drive:', error);
            throw error;
        }
    }

    async uploadAudio(
        fileStream: Readable,
        fileName: string,
        folderId: string,
    ): Promise<string> {
        try {
            const audioMetadata = {
                name: fileName,
                parents: [folderId],
            };

            const response = await this.drive.files.create({
                requestBody: audioMetadata,
                media: {
                    mimeType: 'audio/*',
                    body: fileStream,
                },
                fields: 'id',
            });

            const fileId = response.data.id;

            await this.drive.files.update({
                fileId: fileId,
                requestBody: { name: fileId },
            });

            return fileId;
        } catch (error) {
            console.error('Error uploading audio to Google Drive:', error);
            throw error;
        }
    }

    getThumbnailUrl(fileId: string): string {
        return `https://drive.google.com/thumbnail?id=${fileId}`;
    }

    getVideoUrl(fileId: string): string {
        return `https://drive.google.com/file/d/${fileId}/view`;
    }

    getAudioUrl(fileId: string): string {
        return `https://drive.google.com/file/d/${fileId}/view`;
    }

    async delete(fileId: string): Promise<void> {
        try {
            await this.drive.files.delete({ fileId });
        } catch (error) {
            console.error('Error deleting from Google Drive:', error);
            throw error;
        }
    }

    extractFileIdFromUrl(url: string): string {
        const regex = /(?:\/d\/|id=)([^\/\&\?]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
}
