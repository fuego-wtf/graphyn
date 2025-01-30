'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, Moon, Sun, Users, Zap, Layers, CreditCard, ShoppingBag, Building2, DollarSign, TrendingDown, TrendingUp, Rocket, Wallet, Headphones, Target, Phone, Check, Smartphone, ArrowRight, ArrowRightCircle, Megaphone, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'
import { ThemeToggle } from "@/components/ui/theme-toggle"

// Data imports moved to separate files later
const slides = [
  {
    id: "executive-summary",
    title: "Executive Summary",
    content: (
      <div className="space-y-6">
        <section>
          <p className="text-xl mb-6">
            Building the <strong>infrastructure layer for the next generation of startups</strong>. 
            Our PaaS solution combines <strong>graph databases</strong>, <strong>vector search</strong>, 
            and <strong>AI capabilities</strong> to help founders ship faster.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Now?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>The rise of AI and LLMs has created a need for specialized data infrastructure.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Current solutions are either too complex (AWS) or too simple (Firebase).</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Founders need tools that scale from MVP to unicorn without rebuilding.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Traction</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span><strong>400+ early adopters</strong> from YC network and Turkish startup ecosystem.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span><strong>9.6M TRY ARR</strong> in first year with 15% MoM growth.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span><strong>7.8x LTV:CAC</strong> ratio showing strong unit economics.</span>
            </li>
          </ul>
        </section>
      </div>
    )
  },
  {
    id: "market",
    title: "Market Opportunity",
    content: (
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Primary Market</h2>
          <div className="space-y-4">
            <p>
              There are tens of thousands of early-stage companies that need robust, 
              cost-effective data solutions without hiring large engineering teams.
            </p>
            <p>
              Graphyn fills this niche by providing a plug-and-play environment with 
              graph and vector querying capabilities.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Secondary Market</h2>
          <p>
            As Graphyn scales, it can serve larger organizations needing advanced 
            data orchestration and AI-driven analytics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Future End-User Market</h2>
          <p>
            The consumer-facing offering will allow individuals to store and retrieve 
            their personal data (facts, memories, preferences) once client-based LLM 
            embeddings are stable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Competitive Landscape</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Direct Competitors</h3>
              <p>Traditional PaaS providers lacking out-of-the-box AI/graph capabilities.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Indirect Competitors</h3>
              <p>
                Enterprise-level solutions (e.g., AWS Neptune, Azure Cosmos DB) that may 
                be overkill or too costly for smaller teams.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  {
    id: "products",
    title: "Products & Services",
    content: (
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Core PaaS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Memgraph Integration</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time graph queries for complex data relationships
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Qdrant Integration</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Vector embeddings and similarity searches
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRightCircle className="h-5 w-5 text-primary" />
                <h3 className="font-medium">RabbitMQ</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Handles asynchronous background tasks
              </p>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Advanced Analytics & AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Workflow Automation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Trigger.dev integration for setting up data pipelines and automated processes
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-primary" />
                <h3 className="font-medium">LLM-Ready Architecture</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Structured to integrate large language models for advanced use cases
              </p>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Future End-User Offering</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Personal Data Store</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Individual storage and management of personal interactions with advanced retrieval
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Client Embeddings</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Local or user-specific embeddings ensuring privacy while leveraging AI
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-8">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              Ready for Scale
            </h3>
            <p className="text-sm text-muted-foreground">
              Our architecture is designed to grow with your needs, from MVP to enterprise scale,
              with built-in support for advanced AI capabilities and data processing.
            </p>
          </div>
        </section>
      </div>
    )
  },
  {
    id: "growth",
    title: "Growth Strategy",
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Market Entry (Years 1-2)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Focus</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Entrepreneurs, small product teams, and early-stage startups
              </p>
              <div className="mt-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Target: 400 paying customers</span>
              </div>
            </Card>
            <Card className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Value Proposition</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                "One-click" data environment that saves founders engineering overhead
              </p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">9.6M TRY ARR Goal</span>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Expansion (Years 2-3)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 border-l-4 border-l-purple-500">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Enterprise Outreach</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Custom integrations, dedicated support, and SLA-based contracts
              </p>
              <div className="mt-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Target: 1,200+ customers</span>
              </div>
            </Card>
            <Card className="p-4 border-l-4 border-l-purple-500">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">AI Feature Maturity</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Deploy user-centric LLM features for advanced analytics
              </p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">34M TRY ARR Goal</span>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">End-User Rollout (Years 3-4)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Personal Data Vault</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Individual storage for personal data—facts, preferences, memories
              </p>
              <div className="mt-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Target: 3,000+ customers</span>
              </div>
            </Card>
            <Card className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">LLM-Driven Interactions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Intuitive Q&A and retrieval experiences using embeddings
              </p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">87M TRY ARR Goal</span>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-8">
          <div className="bg-muted p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Growth Trajectory</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  Entry
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  Expansion
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Scale
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[
                { year: 'Y1', customers: 400, arr: 9.6 },
                { year: 'Y2', customers: 1200, arr: 34 },
                { year: 'Y3', customers: 3000, arr: 87 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="customers" stroke="#6366f1" name="Customers" />
                <Line yAxisId="right" type="monotone" dataKey="arr" stroke="#22c55e" name="ARR (M TRY)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    )
  },
  {
    id: "economics",
    title: "Unit Economics",
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Subscription Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 border-t-4 border-t-blue-400">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="h-5 w-5 text-blue-400" />
                <h3 className="font-medium">Starter</h3>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold">1,000 TRY</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Basic graph & vector queries
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Limited storage
                </li>
              </ul>
            </Card>

            <Card className="p-4 border-t-4 border-t-purple-500 relative">
              <div className="absolute -top-3 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs">
                Popular
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Growth</h3>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold">2,500 TRY</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Larger storage capacity
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Automation features
                </li>
              </ul>
            </Card>

            <Card className="p-4 border-t-4 border-t-green-500">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Scale</h3>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold">5,000 TRY</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Unlimited queries
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Higher concurrency
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Priority support
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Customer Acquisition Cost (CAC)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">CAC Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Marketing', value: 4000, fill: '#6366f1' },
                      { name: 'Sales', value: 2000, fill: '#22c55e' },
                      { name: 'Platform', value: 2000, fill: '#f59e0b' }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Total CAC: 8,000 TRY per customer
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Monthly Churn Rate</h3>
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-500">4%</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Average customer lifetime: 25 months
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Lifetime Value (LTV)</h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Average Monthly Revenue
                </div>
                <div className="text-2xl font-bold text-green-500">
                  2,500 TRY
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Average Lifetime
                </div>
                <div className="text-2xl font-bold text-blue-500">
                  25 months
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Lifetime Value
                </div>
                <div className="text-2xl font-bold text-purple-500">
                  62,500 TRY
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">LTV:CAC Ratio</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">0</span>
                  <span className="text-sm text-muted-foreground">Target (3.0)</span>
                  <span className="text-sm text-muted-foreground">Current (7.8)</span>
                  <span className="text-sm text-muted-foreground">10.0</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded mt-2">
                  <div className="absolute h-2 bg-green-500 rounded" style={{ width: '78%' }}></div>
                  <div className="absolute h-2 w-1 bg-gray-400" style={{ left: '30%' }}></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Our LTV:CAC ratio of 7.8 indicates strong profitability potential, well above
                the SaaS industry target of 3.0
              </p>
            </div>
          </Card>
        </section>
      </div>
    )
  },
  {
    id: "financials",
    title: "Financial Projections",
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Customer Growth Model</h2>
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { year: 'Start Y1', new: 400, churn: 0, total: 320 },
                { year: 'Start Y2', new: 1200, churn: 384, total: 1136 },
                { year: 'Start Y3', new: 3000, churn: 1231, total: 2905 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" name="New Customers" fill="#22c55e" />
                <Bar dataKey="churn" name="Churned" fill="#ef4444" />
                <Bar dataKey="total" name="Net Total" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Year 1</div>
                <div className="text-xl font-bold">320</div>
                <div className="text-xs text-muted-foreground">Active Customers</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Year 2</div>
                <div className="text-xl font-bold">1,136</div>
                <div className="text-xs text-muted-foreground">Active Customers</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Year 3</div>
                <div className="text-xl font-bold">2,905</div>
                <div className="text-xs text-muted-foreground">Active Customers</div>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Revenue Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Annual Recurring Revenue</h3>
              <div className="group transition-all duration-300 hover:scale-[1.02]">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={[
                    { year: 'Y1', arr: 9.6 },
                    { year: 'Y2', arr: 34.08 },
                    { year: 'Y3', arr: 87.15 }
                  ]}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      className="opacity-50 group-hover:opacity-75" 
                    />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <RechartsTooltip 
                      wrapperStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="arr" 
                      name="ARR (M TRY)" 
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                      className="group-hover:stroke-[3px]"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Revenue Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Subscriptions', value: 75, fill: '#6366f1' },
                      { name: 'Professional Services', value: 15, fill: '#22c55e' },
                      { name: 'Add-On Features', value: 10, fill: '#f59e0b' }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Year 1 Expense Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Staffing</span>
                  </div>
                  <div className="font-medium">8.0M TRY</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-500" />
                    <span>Infrastructure</span>
                  </div>
                  <div className="font-medium">2.0M TRY</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-green-500" />
                    <span>Marketing & Sales</span>
                  </div>
                  <div className="font-medium">3.2M TRY</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-orange-500" />
                    <span>Other Overheads</span>
                  </div>
                  <div className="font-medium">1.5M TRY</div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between font-bold">
                    <span>Total Expenses</span>
                    <span>14.7M TRY</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Expense Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Staffing', value: 8.0, fill: '#6366f1' },
                      { name: 'Infrastructure', value: 2.0, fill: '#a855f7' },
                      { name: 'Marketing & Sales', value: 3.2, fill: '#22c55e' },
                      { name: 'Other', value: 1.5, fill: '#f59e0b' }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </section>

        <section className="mt-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Break-Even Analysis</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Expected Break-Even:</span>
                <span className="font-medium">Late Year 2 / Early Year 3</span>
              </div>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-2/3"></div>
                <div className="absolute inset-y-0 border-l-2 border-black border-dashed" style={{ left: '66.67%' }}></div>
              </div>
              <div className="text-xs text-muted-foreground">
                Break-even point expected once subscription revenue scales past overheads
              </div>
            </div>
          </Card>
        </section>
      </div>
    )
  },
  // Additional slides to be added...
]

interface SlideshowProps {
  onAllDone?: () => void
}

// Update the chart components with hover effects
const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="transition-transform hover:scale-105 duration-300">
    {children}
  </div>
)

export function Slideshow({ onAllDone }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Navigation functions
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1)
    } else if (onAllDone) {
      onAllDone()
    }
  }

  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPreviousSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  // Fullscreen handling
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }

  return (
    <TooltipProvider>
      <div 
        ref={containerRef}
        className={`relative w-full max-w-[1400px] mx-auto my-8 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}
      >
        {/* Progress Bar */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 p-2 hidden lg:block">
          <div className="flex flex-col gap-2">
            {slides.map((slide, index) => (
              <Tooltip key={slide.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setCurrentSlide(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                      ${currentSlide === index 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      }`}
                  >
                    {index + 1}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{slide.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 2xl:p-10 4xl:p-12">
                {/* Slide Title */}
                <div className="mb-4 sm:mb-6 flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                    {slides[currentSlide].title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    {/* ... other controls ... */}
                  </div>
                </div>

                <div className="relative">
                  <ScrollArea 
                    className={`
                      h-[400px]                /* iPhone SE */
                      sm:h-[450px]             /* Small tablets */
                      md:h-[500px]             /* 13" laptops */
                      lg:h-[600px]             /* 15-16" laptops */
                      xl:h-[700px]             /* 1440p displays */
                      2xl:h-[800px]            /* 2160p/4K displays */
                      3xl:h-[900px]            /* Large 4K displays */
                      4xl:h-[1000px]           /* Ultra-wide 4K */
                      transition-all duration-300
                    `}
                    type="always"
                  >
                    <div className="pr-4 space-y-3 sm:space-y-4 max-w-[2000px] mx-auto">
                      {slides[currentSlide].content}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="mt-4 flex justify-between items-center px-2 sm:px-4">
          <Button
            variant="outline"
            onClick={goToPreviousSlide}
            disabled={currentSlide === 0}
            className="text-xs sm:text-sm md:text-base rounded-full"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <span className="text-xs sm:text-sm md:text-base text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>

          <Button
            onClick={goToNextSlide}
            className="text-xs sm:text-sm md:text-base rounded-full"
          >
            {currentSlide === slides.length - 1 ? 'Finish' : 'Next'} 
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="mt-2 text-center">
          <span className="text-xs text-muted-foreground">
            Use ← → arrow keys to navigate
          </span>
        </div>

        {/* Help Modal */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={toggleHelp}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">Help & Navigation</h3>
                <ul className="space-y-1.5">
                  <li>Use the arrow buttons or keyboard arrows to navigate slides</li>
                  <li>Click on the slide indicators on the left to jump to a specific slide</li>
                  <li>Toggle dark mode with the sun/moon icon</li>
                  <li>Enter fullscreen mode with the expand icon</li>
                  <li>Hover over elements for additional information</li>
                </ul>
                <Button onClick={toggleHelp} className="mt-4 w-full">Close</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}