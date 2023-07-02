import fs from 'fs';

const findChattiest = (uploadedFiles) => {
  const userWordCountMap = new Map();

  uploadedFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file.path, 'utf-8');
    const regex = /(<[^>]+>)([^<]+)/g;
    let match;

    while ((match = regex.exec(fileContent)) !== null) {
      const username = match[1].trim();
      const words = match[2].trim().split(/\s+/);
      const wordCount = words.length;

      if (userWordCountMap.has(username)) {
        userWordCountMap.set(username, userWordCountMap.get(username) + wordCount);
      } else {
        userWordCountMap.set(username, wordCount);
      }
    }
  });

  const sortedUsers = Array.from(userWordCountMap.entries()).sort((a, b) => b[1] - a[1]);
  const chattiestUsers = sortedUsers.map(([username, wordCount]) => ({
    username,
    wordCount,
  }));

  return chattiestUsers;
};

export default findChattiest;
