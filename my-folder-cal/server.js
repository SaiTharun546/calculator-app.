    const path = require('path');
   const express = require('express');
   const app = express();
   const port = process.env.PORT || 3000;

   // Serve static files
   app.use(express.static(path.join(__dirname, 'public')));

   // Calculator API: GET /api/calc?action=add|sub|mul|div&a=number&b=number
   app.get('/api/calc', (req, res) => {
     const { action, a, b } = req.query;
     const x = parseFloat(a), y = parseFloat(b);
     if (isNaN(x) || isNaN(y)) return res.status(400).json({ error: 'Invalid operands' });
     let result;
     switch (action) {
       case 'add': result = x + y; break;
       case 'sub': result = x - y; break;
       case 'mul': result = x * y; break;
       case 'div':
         if (y === 0) return res.status(400).json({ error: 'Divide by zero' });
         result = x / y;
         break;
       default:
         return res.status(400).json({ error: 'Unknown action' });
     }
     res.json({ result });
   });

   app.listen(port, () => {
     console.log(`Calculator app listening at http://localhost:${port}`);
   });