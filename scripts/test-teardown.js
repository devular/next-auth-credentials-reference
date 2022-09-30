const fs = require('fs');
try {
  fs.unlinkSync('prisma/test.db');
  fs.unlinkSync('prisma/test.db-journal');
} catch (e) {
  // ignore
}
