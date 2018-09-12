import gameData from '../../data/game-data';
import templatesData from '../../data/templates-data';
import AbstractView from '../../abstract-view';

export default class AnswersHistoryView extends AbstractView {
  getTemplate() {
    const type = gameData.statsType;
    const resultsView = templatesData.statsTesults;

    const statsItem = {
      [type.WRONG]: resultsView.wrong,
      [type.CORRECT]: resultsView.correct,
      [type.SLOW]: resultsView.slow,
      [type.FAST]: resultsView.fast,
      [type.UNKNOWN]: resultsView.unknown
    };

    let _answers = this.data;

    // TODO
    for (let i = _answers.length; i < gameData.MAX_ANSWERS; i++) {
      _answers.push(type.UNKNOWN);
    }

    const stats = _answers.map((answer) => statsItem[answer]).join(``);

    return `<ul class="stats">${stats}</ul>`;
  }
}
