import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
 
const algorithm = "aes-256-ctr";
const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY;

function urlSafeEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function urlSafeDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return Buffer.from(str, "base64");
}

export function encryptId(id) {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(id), cipher.final()]);
  return urlSafeEncode(Buffer.concat([iv, encrypted]));
}

export function decryptId(hash) {
  const buf = urlSafeDecode(hash);
  const iv = buf.subarray(0, 16);
  const encrypted = buf.subarray(16);
  const decipher = createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString();
}
