declare module '@vimeo/player' {
    interface PlayerOptions {
        id?: number;
        width?: number;
        height?: number;
        autoplay?: boolean;
        loop?: boolean;
        muted?: boolean;
        playsinline?: boolean;
        background?: boolean;
        controls?: boolean;
        [key: string]: any;
    }

    class Player {
        constructor(element: HTMLElement | string, options?: PlayerOptions);
        on(event: string, callback: (event: any) => void): void;
        off(event: string, callback?: (event: any) => void): void;
        getVideoTitle(): Promise<string>;
        getVideoUrl(): Promise<string>;
        getVideoId(): Promise<number>;
        getVideoWidth(): Promise<number>;
        getVideoHeight(): Promise<number>;
        getDuration(): Promise<number>;
        getCurrentTime(): Promise<number>;
        setCurrentTime(seconds: number): Promise<void>;
        getPaused(): Promise<boolean>;
        play(): Promise<void>;
        pause(): Promise<void>;
        setVolume(volume: number): Promise<void>;
        getVolume(): Promise<number>;
        setPlaybackRate(rate: number): Promise<void>;
        getPlaybackRate(): Promise<number>;
        setLoop(loop: boolean): Promise<void>;
        getLoop(): Promise<boolean>;
        setAutopause(autopause: boolean): Promise<void>;
        getAutopause(): Promise<boolean>;
    }

    export default Player;
}
