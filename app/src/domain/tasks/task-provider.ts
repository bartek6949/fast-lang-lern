import {ChatGroq} from "@langchain/groq";
import {SystemMessage, HumanMessage} from "@langchain/core/messages";

class TaskProvider {
  constructor() {
  }


  async getTask1(): Promise<any> {
    const model = new ChatGroq({
      apiKey: ''
    });

    const format =
      {
        phrase: "Hello, how [slot_1] you?",
        slots: {
          1: {
            options: ["are", "is", "am"],
            valid: ["are"],
            validOptionDescription: "We are asking about you, not us. So the correct option is 'are'."
          }
        }
      };

    const messages = [
      new SystemMessage(`
You are a task generator in English. Generate a sentence with a slot to fill in, the slot should check grammar. Adjust the difficulty level to the user's level, which is in the A1-C2 range. A1 - is the lower level, C2 is the largest. Prepare a sentence according to the topic the user is interested in. In your answer, describe why the selected word is correct. You can enter more than 1 slot. Return one sentence and 3 to 5 options. Always respond only in json format:
FORMAT: ${JSON.stringify(format)}
    `),
      new HumanMessage(`
TOPICS: Technology, Environment
LEVEL: B2
SLOT_NUMBER: 3
`)
  ]

    const response = await model.invoke(messages);
    console.log(response);
  }
}
