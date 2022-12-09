let azureController = {}


//Creater User
azureController.sendData = async (req, res) => {

    const { content } = await req.body;

    //console.log(`Bienvenido ${name} ${lastname} \n Correo: ${email}`);


    try {

        const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

        // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
        const languageKey = "78759c66f9d34350a686a2186230e8d5";
        const languageEndpoint = "https://text-analysis-services.cognitiveservices.azure.com/";

        // Authenticate the client with your key and endpoint.
        //const textAnalyticsClient = new TextAnalyticsClient(languageEndpoint, new AzureKeyCredential(languageKey));
        const client = new TextAnalyticsClient(languageEndpoint, new AzureKeyCredential(languageKey));

        // Example method for detecting sentiment and opinions in text.
        //async function sentimentAnalysisWithOpinionMining(client) {

            const sentimentInput = [
                {
                    text: content,
                    id: "0",
                    language: "es"
                }
            ];


            //Resultados
            const results = await client.analyzeSentiment(sentimentInput, { includeOpinionMining: true });

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log(`- Document ${result.id}`);

                if (!result.error) {
                    console.log(`\tDocument text: ${sentimentInput[i].text}`);
                    console.log(`\tOverall Sentiment: ${result.sentiment}`);
                    console.log("\tSentiment confidence scores:", result.confidenceScores);
                    console.log("\tSentences");
                    console.log("**********************");
                    for (const { sentiment, confidenceScores, opinions } of result.sentences) {
                        console.log(`\t- Sentence sentiment: ${sentiment}`);
                        console.log("\t  Confidence scores:", confidenceScores);
                        console.log("\t  Mined opinions");
                        for (const { target, assessments } of opinions) {
                            console.log(`\t\t- Target text: ${target.text}`);
                            console.log(`\t\t  Target sentiment: ${target.sentiment}`);
                            console.log("\t\t  Target confidence scores:", target.confidenceScores);
                            console.log("\t\t  Target assessments");
                            for (const { text, sentiment } of assessments) {
                                console.log(`\t\t\t- Text: ${text}`);
                                console.log(`\t\t\t  Sentiment: ${sentiment}`);                               
                            }
                        }
                    }
                    
                    return res.json({
                        code: 201,
                        msg: "Azure Dice...Overall: "+ result.sentiment,
                        sentimientoGeneral:result.sentiment,
                        ScoresP: result.confidenceScores.positive,
                        ScoresNeu:result.confidenceScores.neutral,
                        ScoresNeg:result.confidenceScores.negative
            
                    })

                } else {
                    console.error(`\tError: ${result.error}`);
                }
            }

            
    
        //}
        
        //sentimentAnalysisWithOpinionMining(textAnalyticsClient);

        //d,mcksndkjcskdcdc

      

    } catch (err) {

        console.log(`Error from api :${err}`);
        res.json({
            code: 501,
            msg: ` Error from api : ${err}`
        })
    }

}

module.exports=azureController;