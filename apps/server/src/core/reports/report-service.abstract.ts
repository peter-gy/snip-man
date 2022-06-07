import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';

/**
 * Interface defining the signatures of the report-generating methods.
 */
export abstract class IReportService {
  /**
   * This report enumerates the email addresses of all users
   * who have created at least 3 code snippets in the last month
   * written in a specific programming language.
   *
   * Example: The language TypeScript, for which the email addresses of users
   * with at least 3 new snippets in the last month get listed.
   *
   * @param progLanguageId the id of the language to query by
   */
  abstract findUsersActiveInSpecificLanguage(
    progLanguageId: Pick<ProgLanguageEntity, 'id'>
  ): Promise<string[]>;

  /**
   * This report enumerates the programming languages in which
   * the most lines of code snippets have been written under a specific tag.
   *
   * Example: The tag “data science”,
   * under which languages like Python or Julia get ranked.
   *
   * @param tagId the id of the tag to query by
   */
  abstract findMostDominantLanguagesByTag(
    tagId: Pick<TagEntity, 'id'>
  ): Promise<ProgLanguageEntity[]>;
}
