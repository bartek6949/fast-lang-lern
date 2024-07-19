enum KnowledgeCategory {
  IncorrectTenses,
  SentenceStructureMistakes,
  MisuseOfArticles,
  SingularPluralConfusion,
  InappropriateVocabulary,
  WrongCollocations,
  MisusedIdioms,
  FalseFriends,
  Typos,
  MisspellingOfDifficultWords,
  InformalLanguageInFormalContexts,
  TooVerboseOrTooConcise,
  InappropriateTone,
}

class KnowledgeLog {
  constructor(
    public readonly date: Date,
    public readonly valid: boolean,
    public readonly taskLog: string
  ) {
  }
}

class Knowledge {
  constructor(
    public category: KnowledgeCategory,
    public logs: KnowledgeLog[]
  ) {
  }

  addLog(log: KnowledgeLog) {
    this.logs.push(log);
  }

  get validNumber() {
    return this.logs.filter(log => log.valid).length;
  }

  get invalidNumber() {
    return this.logs.filter(log => !log.valid).length;
  }

  /**
   * @returns {boolean} true if the knowledge should be repeated
   */
  get shouldRepeat() {
    const recentLogs = this.logs.slice(-10); // consider the last 10 logs
    const validCount = recentLogs.filter(log => log.valid).length;

    // Calculate the ratio of valid logs
    const validRatio = validCount / recentLogs.length;

    // Get the date of the last log
    const lastLogDate = recentLogs[recentLogs.length - 1].date;

    // Get the number of days since the last log
    const daysSinceLastLog = (new Date().getTime() - lastLogDate.getTime()) / (1000 * 60 * 60 * 24);

    // Determine the repeat interval based on the number of logs
    const repeatInterval = this.logs.length > 10 ? 7 : 3; // for example

    // If the ratio of valid logs is below 0.7 (for example), and it's been more than the repeat interval since the last log, repeat the knowledge
    return validRatio < 0.7 && daysSinceLastLog > repeatInterval;
  }
}
