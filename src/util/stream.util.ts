import { PassThrough, Readable } from 'stream';
import { ReadStream } from 'fs';

export async function* concatStreams(readables: ReadStream[]) {
    for (const readable of readables) {
      for await (const chunk of readable) { yield chunk }
    }
  } 

export function combineStream2(streamList: NodeJS.ReadableStream[]) {
  let pass = new PassThrough()
  for (let stream of streamList) {
      const end = stream == streamList.at(-1);
      pass = stream.pipe(pass, { end })
  }
  return pass
}

export function concatStream(streamArray: ReadStream[], streamCounter = streamArray.length): Readable {
  return streamArray.reduce((mergedStream, stream, index) => {
    mergedStream = stream.pipe(mergedStream, { end: false });
    
    stream.once('end', () => {
      mergedStream.write(`\n\n------ Video Segment Boundary ${index + 1} ------\n\n`);
      --streamCounter === 0 && mergedStream.end();
    });
    
    return mergedStream;
  }, new PassThrough());
}

