/* jshint node: true, esversion: 6 */
"use strict";

import cliEngine from '../../lib/cli/cli-engine';
import mockOutput from './mock-output';
import createMockFS from './mock-fs';

export function setupTestCLI({args = ['-IC'], files = {}}) {
  const out = mockOutput();

  return createMockFS(files)
    .then(mockFS => {
      const cli = cliEngine({
        argv: ['node', 'chaplain-cli.js'].concat(args),
        fs: mockFS,

        write: out.write.bind(out),
        writeError: out.writeError.bind(out),
        isTTY: false
      });
      return {cli, out};
    });
}
