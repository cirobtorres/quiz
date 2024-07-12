import { dateFormater } from "@/functions";

export default class MediaApp {
  private id: number;
  private assetId: string;
  private publicId: string;
  private filename: string;
  private secureUrl: string;
  private url: string;
  private format: string;
  private width: number;
  private height: number;
  private updatedAt: Date;
  private createdAt: Date;

  constructor(
    id: number,
    assetId: string,
    publicId: string,
    filename: string,
    secureUrl: string,
    url: string,
    format: string,
    width: number,
    height: number,
    updatedAt: string,
    createdAt: string
  ) {
    this.id = id;
    this.assetId = assetId;
    this.publicId = publicId;
    this.filename = filename;
    this.secureUrl = secureUrl;
    this.url = url;
    this.format = format;
    this.width = width;
    this.height = height;
    this.updatedAt = new Date(updatedAt);
    this.createdAt = new Date(createdAt);
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

  get getFormat() {
    return this.format;
  }

  get getWidth() {
    return this.width;
  }

  get getHeight() {
    return this.height;
  }

  get getUpdatedAt() {
    return dateFormater(this.updatedAt);
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  static create(obj: MediaProps) {
    return new MediaApp(
      obj.id,
      obj.asset_id,
      obj.public_id,
      obj.filename,
      obj.secure_url,
      obj.url,
      obj.format,
      obj.width,
      obj.height,
      obj.updated_at,
      obj.created_at
    );
  }
}
