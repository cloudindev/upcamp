
const net = require('net');

function check(host, port) {
  console.log(`Checking ${host}:${port}...`);
  const socket = new net.Socket();
  socket.setTimeout(5000);
  socket.on('connect', () => {
    console.log(`✅ Connected to ${host}:${port}`);
    socket.destroy();
  });
  socket.on('timeout', () => {
    console.log(`❌ Timeout connecting to ${host}:${port}`);
    socket.destroy();
  });
  socket.on('error', (err) => {
    console.log(`❌ Error connecting to ${host}:${port}: ${err.message}`);
    socket.destroy();
  });
  socket.connect(port, host);
}

check('aws-0-eu-west-1.pooler.supabase.com', 6543);
check('aws-0-eu-west-1.pooler.supabase.com', 5432);
check('db.uojknylpcihuhjszkuem.supabase.co', 5432);
