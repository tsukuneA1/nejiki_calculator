import { SubLayout } from '@/layouts/sub/sub-layout';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'README.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return {
    props: {
      markdown: fileContent,
    },
  };
}

export default function InstructionManual({ markdown }: { markdown: string }) {
  return (
    <SubLayout>
      <div className="prose min-h-80 w-full rounded-lg border-2 border-gray-300 p-5 max-w-3xl">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: (props) => (
              <h1
                {...props}
                className="flex items-center pb-2 text-3xl font-bold"
              />
            ),
            h2: (props) => (
              <h2
                {...props}
                className="border-gray-300 border-b pb-1 text-xl font-bold"
              />
            ),
            a: (props) => (
              <a {...props} className="text-blue-500 hover:text-blue-700" />
            ),
            img: (props) => (
              <img
                {...props}
                className="my-4 mx-auto rounded-md"
                style={{ maxWidth: '200px', height: 'auto' }}
                alt=""
              />
            ),
            video: ( props ) => (
              <video
                {...props}
                controls
                className="h-160 my-4 w-full max-w-xl mx-auto rounded-md border border-gray-300"
              />
            ),
            source: (props) => <source {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </SubLayout>
  );
}
