export default class MediaApp {
  private id: number;
  private assetId: string;
  private publicId: string;
  private filename: string;
  private secureUrl: string;
  private url: string;
  private type: string;
  private width: number;
  private height: number;

  constructor(
    id: number,
    assetId: string,
    publicId: string,
    filename: string,
    secureUrl: string,
    url: string,
    type: string,
    width: number,
    height: number
  ) {
    this.id = id;
    this.assetId = assetId;
    this.publicId = publicId;
    this.filename = filename;
    this.secureUrl = secureUrl;
    this.url = url;
    this.type = type;
    this.width = width;
    this.height = height;
  }

  get getId() {
    return this.id;
  }

  get getAssetId() {
    return this.assetId;
  }

  get getPublicId() {
    return this.publicId;
  }

  get getFilename() {
    return this.filename;
  }

  get getSecureUrl() {
    return this.secureUrl;
  }

  get getUrl() {
    return this.url;
  }

  get getType() {
    return this.type;
  }

  get getWidth() {
    return this.width;
  }

  get getHeight() {
    return this.height;
  }

  static create(obj: MediaProps) {
    return new MediaApp(
      obj.id,
      obj.asset_id,
      obj.public_id,
      obj.filename,
      obj.secure_url,
      obj.url,
      obj.type,
      obj.width,
      obj.height
    );
  }
}
