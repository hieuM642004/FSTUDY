declare module '@vimeo/vimeo' {
    import { Readable } from 'stream';

    export class Vimeo {
        constructor(clientId: string, clientSecret: string, accessToken: string);
        upload(fileStream: Readable, options: { name: string; description: string }, callback: (uri: string) => void, errorCallback: (error: any) => void): void;
        request(options: { method: string; path: string }, callback: (error: any, body: any) => void): void;
    }
}
