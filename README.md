<font style="font-family:arial">
<h1 style="font-size:35px;font-weight:extrabold">Django/Next.js QUIZ project (with Docker)</h1>

<h2 style="font-size:35px;color:green;font-weight:extrabold">Starting application</h2>

```Bash
# In the root of the project (where docker-compose.yml is located)
docker-compose up -d # to run
docker-compose down # to close
```

<h2 style="font-size:25px;color:darkorange;font-weight:extrabold">Running application issues</h2>

<h3 style="color:crimson;font-size:20px;font-weight:extrabold">Docker exec /scripts/commands.sh: no such a file</h3>

<ol>

<li style="font-size:18px">When sending files to git, this might happen:</li>

```bash
warning: in the working copy of 'api/scripts/commands.sh', LF will be replaced by CRLF the next time Git touches it
```

<li style="font-size:18px">If docker is not being able to find commands.sh, consider resaving that file changing end of line from CRLF back to LF. The <font style="color:green">#!/bin/sh</font> line of code is rewritten to <font style="color:green">#!/bin/sh^M</font> which is not a valid interpreter for Bash to read it.</li>

</ol>

<h3 style="color:crimson;font-size:20px;font-weight:extrabold">API decode error</h3>

<p style="font-size:18px">If you're running back and front application directly through the prompt, <font style="color:dodgerblue">remember to name <b>POSTGRES_HOST</b> as <b>localhost</b> on your .env file</font></p>
</font>
