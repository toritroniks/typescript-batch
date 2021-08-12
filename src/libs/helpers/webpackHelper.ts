import { sync } from 'glob';

export function getEntries() {
  const jobList = sync(__dirname.split(/[\\\/]src/)[0] + '/**/handler.ts');
  const entries: Record<string, string> = {};
  jobList.forEach(path => {
    const jobRegexRes = /\/jobs\/(.*)/.exec(path);
    if (jobRegexRes && jobRegexRes.length > 1) {
      const jobPath = '@jobs/' + jobRegexRes[1];
      const jobName = jobRegexRes[1].split('/').splice(-2)[0] + '/handler.js';
      entries[jobName] = jobPath;
    }
  });
  console.log(entries);
  return entries;
}
