import storageData from './TestQuestion.json';
import { writable } from 'svelte/store';
const allJsonData =writable(storageData);

export default allJsonData;