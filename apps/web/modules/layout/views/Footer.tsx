import { ReactElement } from 'react';
import { VscGithubAlt } from 'react-icons/vsc';

const developers = [
  {
    name: 'Péter Ferenc Gyarmati',
    githubHandle: 'peter-gy',
    studentId: '11913446',
  },
  {
    name: 'Simon Eckerstorfer',
    githubHandle: 'S-ecki',
    studentId: '11911424',
  },
];

function Footer(): ReactElement {
  return (
    <div className="py-8 px-2 min-h-[10vh] bg-navy-800 rounded-t-2xl flex flex-col items-center space-y-5">
      <h3 className="text-white font-bold">Developed By</h3>
      <div className="w-full grow flex flex-row justify-around">
        {developers.map((developer) => (
          <Developer key={developer.name} {...developer} />
        ))}
      </div>
    </div>
  );
}

type DeveloperProps = {
  name: string;
  githubHandle: string;
  studentId: string;
};

function Developer({
  name,
  githubHandle,
  studentId,
}: DeveloperProps): ReactElement {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center text-lg text-white font-bold">
      <div className="italic">{name}</div>
      <div className="w-[25px] border-white border-t-[1px]"></div>
      <div className="px-2 flex items-center space-x-2">
        <div>{studentId}</div>
        <a
          className="text-white p-2 border-white border-2 hover:text-highlight"
          href={`https://github.com/${githubHandle}`}
          target="_blank"
          rel="noreferrer"
        >
          <VscGithubAlt />
        </a>
      </div>
    </div>
  );
}

export default Footer;
