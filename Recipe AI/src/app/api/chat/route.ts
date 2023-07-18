import { Message } from "@/core/types/types";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {

    //  first we get the details from the front end
    const body = await request.text();
    const bodyJSON = JSON.parse(body);

    //  we create an array of Messages
    const messages: Message[] = [];

    //  first we pre-set the GPT model as an excellent event planner who can help suggest places to explore
    const newMessage: Message = {
        role: "system",
        content: "You are an excellent meal planner who can help suggest meals for people to cook or make.If you do not recieve enough information, ask people for additional information: 1) What ingredients do you have available? 2)How much time do you have? 3) Is there a particular type of cuisine you would prefer?. Provide a list of 2 or more recipes. Do not provide recipe instructions only names."
    };
    messages.push(newMessage);

    //  then we get the rest of the conversation from the front end
    const conversation: Message[] = bodyJSON.conversation;
    conversation.forEach((converse: Message) => {
        messages.push(converse);
    });

    //  creating the body to send to chatGPT's API
    const bodyToSend = {
        "model": "gpt-3.5-turbo-0301",
        "temperature": 0.7,
        "messages": messages
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + process.env.OPENAI_API_KEY
        },
        body: JSON.stringify(bodyToSend)
    });

    //  getting the json after the promise is fulfilled
    const json = await response.json();
    let returnMsg: string = "";

    if (json.choices != null) {
        
        const responseMessage = json.choices[0].message.content;
        returnMsg = responseMessage;
    }

    return new Response(returnMsg);
}