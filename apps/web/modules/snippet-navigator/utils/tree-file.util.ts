import {
  ProgSnippetEntity,
  ProgTopicWithSnippetPreviews,
} from '@snip-man/entities';
import { TreeFile } from '@geist-ui/core/dist/tree';
import { arrayToTree } from 'performant-array-to-tree';

export function fileTreeFromTopicsWithSnippets(
  topicsWithSnippets: ProgTopicWithSnippetPreviews[]
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
  if (key === 'progSnippetPreviews') {
    const progSnippets = obj['progSnippetPreviews'];
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
    extra: JSON.stringify({ ...progSnippet, type: 'file' }),
  };
}

function treeFileFromProgTopic(
  progTopic: ProgTopicWithSnippetPreviews
): ProgTopicWithSnippetPreviews & TreeFile {
  const snippets = progTopic.progSnippetPreviews.map(treeFileFromProgSnippet);
  return {
    ...progTopic,
    progSnippetPreviews: snippets,
    type: 'directory',
    name: progTopic.name,
    extra: JSON.stringify({ ...progTopic, type: 'directory' }),
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
