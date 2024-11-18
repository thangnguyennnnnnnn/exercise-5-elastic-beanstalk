import fs from 'fs';
import { generateKeyPairSync } from 'crypto';
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
     modulusLength: 2048,
  });

  fs.writeFileSync('private_key.pem', privateKey.export({ type: 'pkcs1', format: 'pem' }));
  fs.writeFileSync('public_key.pem', publicKey.export({ type: 'spki', format: 'pem' }));