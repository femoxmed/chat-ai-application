import fs from 'fs';
import path from 'path';
import template from '../prompts/chatbot.txt';

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'AjinkePark.md'),
   'utf-8'
);
export const instructions = template.replace('{{parkInfo}}', parkInfo);
