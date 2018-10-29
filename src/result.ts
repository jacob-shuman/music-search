import { Source } from "./sources/source";

export class SourceResult<T> {
  // Copy of source used
  readonly source: Source;

  // Results from source
  readonly results: Array<T>;

  // Success state of the source action
  readonly success: boolean;

  constructor(options: {
    source: Source;
    results: Array<T>;
    success: boolean;
  }) {
    this.source = options.source;
    this.results = options.results;
    this.success = options.success;
  }
}
