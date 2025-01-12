import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React, {FormEvent, useState, useTransition} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {BotIcon, LanguagesIcon} from "lucide-react";
import {Doc} from "yjs";
import {toast} from "sonner";
import Markdown from "react-markdown";

type Language =
    | "english"
    | "spanish"
    | "portuguese"
    | "french"
    | "german"
    | "chinese"
    | "arabic"
    | "hindi"
    | "russian"
    | "japanese";


const languages: Language[] = [
    "english",
    "german",
    "spanish",
    "portuguese",
    "french",
    "arabic",
    "russian",
    "japanese"
]

interface TranslateDocumentProps {
    doc: Doc
}

export const TranslateDocument = ({doc}: TranslateDocumentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<string>("")
    const [summary, setSummary] = useState("")
    const [question, setQuestion] = useState("")
    const [isPending, startTransition] = useTransition()

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();
            console.log(documentData)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        documentData,
                        targetLang: language
                    })
                }
            )

            if (res.ok) {
                const {translatedText} = await res.json()
                setSummary(translatedText)

                console.log(summary)
                toast.success("Translated summary successfully")
            } else {
                toast.error("Error while translating")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild={true} variant={"outline"}>
                <DialogTrigger>
                    Translate
                    <LanguagesIcon/>
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Translate the document</DialogTitle>
                    <DialogDescription>
                        AI will translate the document to selected language
                    </DialogDescription>
                </DialogHeader>

                {summary && (
                    <div className={"flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100"}>
                        <div className={"flex"}>
                            <BotIcon className={"w-10 flex-shrink-0"}/>
                            <p className={"font-bold"}>
                                GPT {isPending ? "is thinking..." : "says"}
                            </p>
                        </div>
                        <div>
                            {!isPending && (
                                <Markdown>
                                    {summary}
                                </Markdown>
                            )}
                        </div>
                    </div>
                )}

                <form className={"flex gap-2"} onSubmit={handleAskQuestion}>
                    <Select value={language} onValueChange={(value) => setLanguage(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Please select a language"}/>
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((language) => (
                                <SelectItem onClick={() => setLanguage(language)} value={language} key={language}>
                                    {language.charAt(0).toUpperCase() + language.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type={"submit"} disabled={isPending || !language}>
                        {isPending ? "Translating..." : "Translate"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}