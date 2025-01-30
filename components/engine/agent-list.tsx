"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAgentStore } from "@/store/agent"
import Link from "next/link"

export function AgentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const agents = useAgentStore((state) => state.agents)

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search agents"
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="border rounded-lg dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50 dark:hover:bg-gray-800/50">
              <TableHead className="w-[200px] font-medium">NAME</TableHead>
              <TableHead className="font-medium">ID</TableHead>
              <TableHead className="w-[100px]">STATUS</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id} className="hover:bg-muted/50 dark:hover:bg-gray-800/50">
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{agent.id}</TableCell>
                <TableCell>{agent.status}</TableCell>
                <TableCell>
                  <Link href={`/engine/agents/${agent.id}`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

