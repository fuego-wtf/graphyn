import React from 'react'
import { Check, Users, Zap, Layers, Building2, DollarSign, TrendingUp, Rocket, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, PieChart, Pie } from 'recharts'
import { cn } from "@/lib/utils"

export interface SlideProps {
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

export interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface PieChartData {
  name: string;
  value: number;
  fill?: string;
}

interface LineChartData {
  year: string;
  customers?: number;
  arr?: number;
  [key: string]: string | number | undefined;
}

interface BaseChartProps {
  className?: string;
  style?: React.CSSProperties;
}

interface PieChartProps extends BaseChartProps {
  data: PieChartData[];
}

interface LineChartProps extends BaseChartProps {
  data: LineChartData[];
  children?: React.ReactNode;
}

const MemoizedPieChart = React.memo(function MemoPieChart({ data, ...props }: PieChartProps) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    {...props}
                />
                <RechartsTooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
})

const MemoizedLineChart = React.memo(function MemoLineChart({ data, children, ...props }: LineChartProps) {
        return (
                <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data} {...props}>
                                {children}
                        </LineChart>
                </ResponsiveContainer>
        )
})

const MemoizedTimeline = React.memo(function Timeline({ items }: { items: { title: string, items: string[] }[] }) {
    return (
        <div className="space-y-4">
            {items.map((section) => (
                <MemoizedCard key={section.title} className="p-4 transition-all duration-200 hover:bg-muted/50">
                    <h3 className="text-base font-medium mb-2">{section.title}</h3>
                    <ul className="space-y-2">
                        {section.items.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground/90">{item}</span>
                            </li>
                        ))}
                    </ul>
                </MemoizedCard>
            ))}
        </div>
    )
})

const MemoizedCard = React.memo(function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("rounded-lg border bg-card text-card-foreground", className)}>
            {children}
        </div>
    )
})

export const businessPlanSlides: Slide[] = [
    {
        id: "vision",
        title: "Vision & Core Feature",
        content: (
            <div className="flex flex-col justify-start space-y-6">
                <section className="flex flex-col items-start">
                    <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
                    <p className="text-lg text-muted-foreground/90">
                        Enable businesses to <strong>map, analyze, and act on user interactions</strong> while giving <strong>end users</strong> the <strong>transparency and control</strong> they increasingly demand.
                    </p>
                </section>

                <section className="w-full">
                    <h2 className="text-xl font-semibold mb-2">The One Feature to Hook Users</h2>
                    <div className="bg-muted/50 p-4 rounded-lg backdrop-blur-sm">
                        <h3 className="text-base font-medium mb-2">Instant Graph Insights</h3>
                        <p className="text-sm text-muted-foreground/90">
                            A quick, visually compelling way to see user journeys across channels. If this doesn&apos;t make potential users say &quot;Wow, I need that,&quot; we pivot.
                        </p>
                    </div>
                </section>

                <section className="w-full">
                    <h2 className="text-xl font-semibold mb-3">Core Functionality</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <MemoizedCard className="p-3 transition-all duration-200 hover:bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Simplify Complex User Data</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Use Memgraph to represent every user event as connected nodes/edges
              </p>
            </MemoizedCard>
            <MemoizedCard className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Quick AI Decisions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Let LLMs propose actions, but with clear guardrails
              </p>
            </MemoizedCard>
            <MemoizedCard className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-medium">User Control</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Portal for users to manage their data footprint
              </p>
            </MemoizedCard>
          </div>
        </section>
      </div>
    )
  },
{
    id: "market",
    title: "Market Needs & Validation",
    content: (
        <div className="flex flex-col justify-start space-y-6">
            <section className="w-full">
                <h2 className="text-xl font-semibold mb-3">Key Market Needs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <MemoizedCard className="p-3 transition-all duration-200 hover:bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Personalization</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Companies want deeper, more nuanced customer segmentation
              </p>
              <div className="mt-4 text-sm font-medium text-primary">
                ~30% conversion lift
              </div>
            </MemoizedCard>
            <MemoizedCard className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-primary" />
                <h3 className="font-medium">AI Automation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Potential for time-saving automations with trust and reliability
              </p>
              <div className="mt-4 text-sm font-medium text-primary">
                50% support reduction
              </div>
            </MemoizedCard>
            <MemoizedCard className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Data Transparency</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Secondary concern until scale demands it
              </p>
              <div className="mt-4 text-sm font-medium text-primary">
                Growing priority
              </div>
            </MemoizedCard>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Market Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MemoizedCard className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Forbes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                ~30% conversion lift with hyper-personalized user journeys
              </p>
            </MemoizedCard>
            <MemoizedCard className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="font-medium">McKinsey</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Well-implemented AI can reduce support overhead by 50%
              </p>
            </MemoizedCard>
          </div>
        </section>
      </div>
    )
  },
{
    id: "product",
    title: "Product & Services",
    content: (
        <div className="flex flex-col justify-start space-y-6">
            <section className="w-full">
                <h2 className="text-xl font-semibold mb-3">Instant Graph Insights (MVP)</h2>
                <MemoizedCard className="p-4 transition-all duration-200 hover:bg-muted/50">
                    <div className="space-y-4">
                        {[
                            {
                                title: 'Why',
                                content: 'Visualizing user flows in real time reveals bottlenecks or opportunities'
                            },
                            {
                                title: 'How',
                                content: "Memgraph processes events from the user's app; Graphyn engine auto-generates graphs"
                            },
                            {
                                title: 'Hook',
                                content: 'Businesses see their user funnel at a glance. If they love it, they will pay to expand usage'
                            }
                        ].map(({ title, content }) => (
                            <div key={title}>
                                <h3 className="text-base font-medium mb-2">{title}</h3>
                                <p className="text-sm text-muted-foreground/90">{content}</p>
                            </div>
                        ))}
                    </div>
                </MemoizedCard>
            </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Optional Add-Ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MemoizedCard className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-medium">LLM Actions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For early adopters who want to test AI automations (e.g., &quot;Offer 10% discount if churn risk is high&quot;)
              </p>
            </MemoizedCard>
            <MemoizedCard className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-medium">User Control Panel</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For companies that want to show end users their &quot;data footprints&quot; and handle deletion requests
              </p>
            </MemoizedCard>
          </div>
        </section>
      </div>
    )
  },


  {
    id: "roadmap",
    title: "6-Month Roadmap",
    content: (
      <div className="flex flex-col justify-start space-y-6">
        <MemoizedTimeline 
          items={[
            {
              title: "Month 1-2",
              items: [
                "Build the Instant Graph Insights MVP",
                "Demo to 10 potential customers",
                "Collect feedback"
              ]
            },
            {
              title: "Month 3-4",
              items: [
                "Refine based on real usage data",
                "If customers love it, begin charging",
                "If not, pivot"
              ]
            },
            {
              title: "Month 5-6",
              items: [
                "Small tests of LLM add-ons",
                "User-data control portal for select businesses",
                "Keep building only if tests show adoption"
              ]
            }
          ]}
        />
        
        <div className="mt-4">
          <MemoizedCard className="p-4 bg-muted/50">
            <h3 className="text-base font-medium mb-2">Why No Long-Term Plan?</h3>
            <p className="text-sm text-muted-foreground/90">
                Because if the MVP doesn&apos;t resonate in these 6 months, we&apos;ll change direction.
            </p>
          </MemoizedCard>
        </div>
      </div>

    )
  },
  {
    id: "growth",
    title: "Growth Strategy",
    content: (
      <div className="flex flex-col justify-start space-y-6">
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-3">Market Entry (Years 1-2)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MemoizedCard className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Focus</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Entrepreneurs, small product teams, and early-stage startups
              </p>
              <div className="mt-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Target: 400 active customers</span>
              </div>
            </MemoizedCard>
            <MemoizedCard className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Value Proposition</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                &quot;One-click&quot; data environment that saves founders engineering overhead
              </p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">9.6M TRY ARR Goal</span>
              </div>
            </MemoizedCard>
          </div>
        </section>

        <section className="w-full">
          <h2 className="text-xl font-semibold mb-3">Growth Trajectory</h2>
          <MemoizedCard className="p-4">
            <MemoizedLineChart 
              data={[
                { year: 'Y1', customers: 400, arr: 9.6 },
                { year: 'Y2', customers: 1200, arr: 34 },
                { year: 'Y3', customers: 3000, arr: 87 }
              ]}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="#6366f1" 
                  name="Customers"
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="arr" 
                  stroke="#22c55e" 
                  name="ARR (M TRY)"
                  strokeWidth={2}
                />
        </MemoizedLineChart>
      </MemoizedCard>
        </section>
      </div>
    )
  },
  {
    id: "unit-economics",
    title: "Unit Economics",
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Customer Acquisition Cost (CAC)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MemoizedCard className="p-6">
              <h3 className="text-lg font-medium mb-4">CAC Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Marketing', value: 150, fill: '#6366f1' },
                      { name: 'Sales', value: 100, fill: '#22c55e' },
                      { name: 'Platform', value: 50, fill: '#f59e0b' }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  />
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Total CAC: $300 per customer
              </div>
            </MemoizedCard>

            <MemoizedCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Monthly Churn Rate</h3>
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-500">4%</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Average customer lifetime: 25 months
                  </div>
                </div>
              </div>
            </MemoizedCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Lifetime Value (LTV)</h2>
          <MemoizedCard className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Average Monthly Revenue
                </div>
                <div className="text-2xl font-bold text-green-500">
                  $300
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
                  $7,500
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">LTV:CAC Ratio</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">0</span>
                  <span className="text-sm text-muted-foreground">Target (3.0)</span>
                  <span className="text-sm text-muted-foreground">Current (25.0)</span>
                  <span className="text-sm text-muted-foreground">30.0</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded mt-2">
                  <div className="absolute h-2 bg-green-500 rounded" style={{ width: '83.3%' }}></div>
                  <div className="absolute h-2 w-1 bg-gray-400" style={{ left: '10%' }}></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Our LTV:CAC ratio of 25.0 indicates exceptional profitability potential, well above
                the SaaS industry target of 3.0
              </p>
            </div>
          </MemoizedCard>
        </section>
      </div>
    )
  },
{
    id: "financials",
    title: "Financial Projections",
    content: (
        <div className="flex flex-col justify-start space-y-6">
            <section className="w-full">
                <h2 className="text-xl font-semibold mb-3">Revenue Streams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MemoizedCard className="p-4">
                        <h3 className="text-base font-medium mb-3">Annual Recurring Revenue</h3>
                        <MemoizedLineChart 
                            data={[
                                { year: 'Y1', arr: 1.44 },
                                { year: 'Y2', arr: 4.32 },
                                { year: 'Y3', arr: 10.8 }
                            ]}
                        >
                            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <RechartsTooltip />
                            <Line 
                                type="monotone" 
                                dataKey="arr" 
                                name="ARR (M $)" 
                                stroke="#22c55e"
                                strokeWidth={2}
                            />
                        </MemoizedLineChart>
                    </MemoizedCard>

                    <MemoizedCard className="p-4">
                        <h3 className="text-base font-medium mb-3">Revenue Distribution</h3>
                        <MemoizedPieChart
                            data={[
                                { name: 'Core Platform', value: 75, fill: '#6366f1' },
                                { name: 'LLM Actions', value: 15, fill: '#22c55e' },
                                { name: 'User Control', value: 10, fill: '#f59e0b' }
                            ]}
                        />
                    </MemoizedCard>
                </div>
            </section>

            <section className="w-full">
                <h2 className="text-xl font-semibold mb-3">Break-Even Analysis</h2>
                <MemoizedCard className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Expected Break-Even:</span>
                            <span className="font-medium">Month 18 (Mid Year 2)</span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-3/4 transition-all duration-1000"></div>
                            <div className="absolute inset-y-0 border-l-2 border-primary border-dashed" style={{ left: '75%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Break-even expected when reaching 400 active customers at $300/mo
                        </p>
                    </div>
                </MemoizedCard>
            </section>
        </div>
    )
}

] 

export function ProductSlide({ onNext, onPrevious, onClose }: SlideProps) {
  // ... rest of the code
}

export function MarketSlide({ onNext, onPrevious, onClose }: SlideProps) {
  // ... rest of the code
} 