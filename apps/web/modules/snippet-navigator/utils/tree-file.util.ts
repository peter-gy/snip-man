import { ProgSnippetEntity, ProgTopicWithSnippets } from '@snip-man/entities';
import { TreeFile } from '@geist-ui/core/dist/tree';
import { arrayToTree } from 'performant-array-to-tree';

export function fileTreeFromTopicsWithSnippets(
  topicsWithSnippets: ProgTopicWithSnippets[]
): TreeFile[] {
  const topics = topicsWithSnippets.map(treeFileFromProgTopic);
  const tree = arrayToTree(topics, {
    id: 'id',
    parentId: 'parentId',
    childrenField: 'files',
    dataField: null,
  });
  traverse(tree, process);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return tree;
}

function process(obj: any, key: string) {
  if (key === 'progSnippets') {
    const progSnippets = obj['progSnippets'];
    obj['files'] = [...obj['files'], ...progSnippets];
  }
}

function treeFileFromProgSnippet(
  progSnippet: ProgSnippetEntity
): ProgSnippetEntity & TreeFile {
  return {
    ...progSnippet,
    type: 'file',
    name: progSnippet.headline,
    extra: JSON.stringify(progSnippet),
  };
}

function treeFileFromProgTopic(
  progTopic: ProgTopicWithSnippets
): ProgTopicWithSnippets & TreeFile {
  const snippets = progTopic.progSnippets.map(treeFileFromProgSnippet);
  return {
    ...progTopic,
    progSnippets: snippets,
    type: 'directory',
    name: progTopic.name,
    extra: JSON.stringify(progTopic),
  };
}

function traverse(obj: any, callback: (obj: any, key: string) => void) {
  for (const key in obj) {
    callback.apply(this, [obj, key]);
    if (obj[key] !== null && typeof obj[key] == 'object') {
      // descend in the tree
      traverse(obj[key], callback);
    }
  }
}