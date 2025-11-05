declare module "segment" {
  interface SegmentOptions {
    // bạn có thể khai báo option nếu muốn, hoặc để any
    [key: string]: any;
  }

  interface SegmentResult {
    w: string; // từ
    p: string; // loại từ
  }

  class Segment {
    constructor();
    useDefault(): void;
    doSegment(text: string, options?: SegmentOptions): SegmentResult[];
  }

  export = Segment;
}
