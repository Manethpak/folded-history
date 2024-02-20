import _ from "lodash"
import moment from "moment"
import React from "react"

import { getFavicon } from "~lib/utils"
import { useHistory } from "~providers/history-provider"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion"
import { ScrollArea } from "./ui/scroll-area"

const HistoryList = () => {
  const { history, grouped } = useHistory()

  return (
    <ScrollArea className="h-[30rem]">
      <Accordion type="multiple" className="mr-3">
        {history &&
          grouped &&
          Object.keys(grouped)?.map((key) => (
            <AccordionItem value={key} key={key}>
              <AccordionTrigger>
                <div className="flex gap-2 items-center">
                  <img src={getFavicon(key)} />
                  <a href={"https://" + key} target="_blank">
                    {" "}
                    {key}
                  </a>
                </div>
              </AccordionTrigger>
              <AccordionContent asChild>
                <div className="space-y-4">
                  {grouped[key].map((item) => (
                    <div
                      className="ml-2 flex gap-1 justify-between"
                      key={item.id}>
                      <div className="flex gap-1">
                        <img
                          src={getFavicon(item.url, "20")}
                          className="syelf-center"
                        />

                        <a
                          className="max-w-[16rem] line-clamp-1 hover:underline"
                          href={item.url}
                          target="_blank">
                          {item.title}
                        </a>
                      </div>
                      <p className="text-xs">
                        {moment(item.lastVisitTime).format("DD/MM hh:mm A")}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </ScrollArea>
  )
}

export default HistoryList
