# NLCDatabase
A database that searches for any television transcripts and related metadata given a keyword. <br />
<br />
Web Stack: MongoDB, Express, React.js, Node.js, Amazon EC2 <br />
<br />
Commands: 
- "npm run dev" to run the react front end and node.js backend concurrently. 
- "npm start server" to just run the backend.

Few notes about TVEye's API for the next developer
- The api requires a stable IP address when returning data. That's why this website is hosted on an EC2 rather than some other webhosting service like heroku
- You cannot utilize the API on localhost. I recommend SSH-ing into your EC2 instance (after you've set a port to public), and editing your code in it using VIM. 
- The return XML data's Content-Type is set to NULL. This is why I set the type to XML before I parse it. 
