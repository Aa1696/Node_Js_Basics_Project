# parsed-body

## Install

```bash
npm install --save parsed-body
```

## Usage

```js
import parsedBody from 'parsed-body/json';

async req => {
  const body = await parsedBody(req);
  console.log('body:', body);
}
```

**Important:** This consumes the body, so it isn't always safe to call it multiple times.
If you use the same version of `parsed-body`, it will work though.
