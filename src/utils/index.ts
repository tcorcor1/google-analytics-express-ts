export const getPrivKeyFormatted = (envVar: string) => {
  return envVar.replace(/\\n/g, '\n');
};
