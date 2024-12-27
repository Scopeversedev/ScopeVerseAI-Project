import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  const FaqsData=[
    {
      "q":"What is ScopeVerse AI?",
      "a":<>
ScopeVerse AI is an advanced cryptocurrency analysis platform that leverages AI to provide actionable insights, sentiment analysis, and token evaluations to empower traders of all levels.
</>
    },
   {
    "q":"Who can use ScopeVerse AI?",
    "a":<>
ScopeVerse AI is designed for anyone interested in cryptocurrency trading, from beginners to seasoned traders. The intuitive interface and advanced tools make it accessible to all.

    </>
   } ,
   {
    "q":"How does ScopeVerse AI work?",
    "a":<>
Our platform uses advanced AI algorithms to analyze real-time and historical data, delivering insights like token quality scores, smart money activity, and sentiment trends.

    </>
   } ,
   {
    "q":"What is the Scope AI chatbot?",
    "a":<>
Scope is a witty, conversational AI assistant that provides trading insights, answers questions, and makes your crypto journey more engaging.

    </>
   },
   {
    "q":"How does the Twitter bot enhance my trading experience?",
    "a":<>
Our Twitter bot provides real-time updates, market trends, and insights about popular tokens, ensuring you stay informed and ahead of the curve.


    </>
   } ,
   {
    "q":"What is the token quality score?",
    "a":<>
The token quality score is a numerical rating out of 10 that reflects the overall potential and safety of a cryptocurrency based on various factors like liquidity, holder distribution, and sentiment.

    </>
   } ,
   {
    "q":"How secure is my data with ScopeVerse AI?",
    "a":<>

We prioritize user security with encrypted data storage and adherence to best practices in cybersecurity to protect your information.

    </>
   }  
   ,
   {
    "q":"Does ScopeVerse AI store my trading activity?",
    "a":<>

ScopeVerse AI does not store your trading activity. All analyses and insights are generated in real-time without retaining your personal data.

    </>
   }  ,
   {
    "q":"How does ScopeVerse AI track social sentiment?",
    "a":<>

We use advanced algorithms to analyze social media posts, such as tweets about $Ticker tokens, identifying trends, sentiment shifts, and user engagement.

    </>
   }    ,
   {
    "q":"Does ScopeVerse AI integrate with trading platforms?",
    "a":<>

Integration with popular trading platforms is in development and will be available in future updates.

    </>
   }    ,
   {
    "q":"What is the AI learning mechanism?",
    "a":<>

ScopeVerse AI continuously evolves through machine learning, adapting to new data and improving insights over time.
    </>
   }  

  ]
  export default function FAQ() {
    return (
      <div className="min-h-screen  px-6 py-12 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-lg">
              The advanced Solana token analysis powered by artificial intelligence
            </p>
          </div>
  
          {/* Right Column - Accordion */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {FaqsData.map((item,index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-none rounded-lg bg-[#1D0C29] px-6 py-2"
                >
                  <AccordionTrigger className="text-white hover:no-underline">
                    <span className="text-left">
                      {item.q}                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
  
  