import type {
  Lead,
  LeadScore,
  ActivityItem,
  DailyStats,
  Appointment,
} from "./types";

// ---------------------------------------------------------------------------
// 15 Leads
// ---------------------------------------------------------------------------

export const leads: Lead[] = [
  // ── HOT leads (5) ────────────────────────────────────────────────────────

  {
    id: "lead-001",
    name: "Sarah Mitchell",
    phone: "555-218-4390",
    email: "sarah.mitchell@gmail.com",
    address: "4821 E Baseline Rd, Phoenix, AZ 85042",
    service: "plumbing",
    platform: "Thumbtack",
    score: "HOT",
    status: "qualified",
    responseTime: 18,
    createdAt: "2026-03-09T08:12:00Z",
    description:
      "Water heater burst in my garage about an hour ago. There is water everywhere and I need someone out here ASAP. The water heater is a 50-gallon Rheem, about 12 years old.",
    facts: {
      urgency: "HIGH",
      budget: "$1,500–$3,000",
      competingQuotes: 1,
      propertyType: "Single Family",
    },
    transcript: [
      { speaker: "ai", text: "Hi, this is the InLeads assistant calling on behalf of Mike's Plumbing & Home Services. Am I speaking with Sarah?", timestamp: "0:00" },
      { speaker: "lead", text: "Yes, this is Sarah. Thank god someone called back so fast.", timestamp: "0:04" },
      { speaker: "ai", text: "I saw your request about a water heater issue. Can you tell me a bit more about what's going on?", timestamp: "0:08" },
      { speaker: "lead", text: "The water heater in my garage just burst. There's water all over the floor and it's starting to seep into the house.", timestamp: "0:14" },
      { speaker: "ai", text: "That sounds urgent. Is the water supply to the heater turned off, or is it still flowing?", timestamp: "0:20" },
      { speaker: "lead", text: "My husband shut the valve off but there's still a lot of standing water.", timestamp: "0:25" },
      { speaker: "ai", text: "Good that the valve is off. Do you have a timeline in mind — do you need someone out today?", timestamp: "0:30" },
      { speaker: "lead", text: "Absolutely today. As soon as possible. This is an emergency.", timestamp: "0:34" },
      { speaker: "ai", text: "Understood. Do you have a budget range in mind for the repair or replacement?", timestamp: "0:38" },
      { speaker: "lead", text: "I'm thinking somewhere between fifteen hundred and three thousand depending on what needs to happen.", timestamp: "0:43" },
      { speaker: "ai", text: "Have you reached out to any other plumbing companies for quotes?", timestamp: "0:48" },
      { speaker: "lead", text: "I submitted one other request on Thumbtack but you guys called first.", timestamp: "0:52" },
      { speaker: "ai", text: "Great. I've got all the details. Mike will personally call you back within the next ten minutes to schedule a visit today. Is this the best number to reach you?", timestamp: "0:56" },
      { speaker: "lead", text: "Yes, this number is perfect. Thank you so much.", timestamp: "1:02" },
    ],
    timeline: [
      { type: "received", time: "2026-03-09T08:12:00Z", detail: "Lead received from Thumbtack" },
      { type: "ai_called", time: "2026-03-09T08:12:18Z", detail: "AI dialed Sarah Mitchell in 18 seconds" },
      { type: "call_completed", time: "2026-03-09T08:13:22Z", detail: "Call completed — 1 min 4 sec" },
      { type: "scored", time: "2026-03-09T08:13:25Z", detail: "Scored HOT — emergency, high urgency, good budget" },
      { type: "sms_sent", time: "2026-03-09T08:13:30Z", detail: "SMS briefing sent to Mike" },
    ],
  },

  {
    id: "lead-002",
    name: "James Rodriguez",
    phone: "555-743-1028",
    email: "jrodriguez88@yahoo.com",
    address: "1130 W Camelback Rd, Phoenix, AZ 85015",
    service: "HVAC",
    platform: "Angi",
    score: "HOT",
    status: "called",
    responseTime: 22,
    createdAt: "2026-03-08T14:45:00Z",
    description:
      "Our AC unit completely died this morning. It's already 98 degrees outside and we have two young kids at home. Need emergency repair or replacement today.",
    facts: {
      urgency: "HIGH",
      budget: "$2,000–$5,000",
      competingQuotes: 2,
      propertyType: "Single Family",
    },
    transcript: [
      { speaker: "ai", text: "Hello, this is the InLeads assistant calling for Mike's Plumbing & Home Services. Is this James?", timestamp: "0:00" },
      { speaker: "lead", text: "Yeah, this is James. You guys do HVAC too?", timestamp: "0:04" },
      { speaker: "ai", text: "We do! I saw your request about an AC unit. Can you walk me through what's happening?", timestamp: "0:08" },
      { speaker: "lead", text: "The whole unit just stopped working. No cold air at all. The fan outside isn't even spinning.", timestamp: "0:13" },
      { speaker: "ai", text: "How old is the unit, do you know?", timestamp: "0:18" },
      { speaker: "lead", text: "It's about fifteen years old. A Trane unit. It's been struggling the last couple summers.", timestamp: "0:23" },
      { speaker: "ai", text: "Got it. And with the heat today, I imagine you need someone out pretty quickly?", timestamp: "0:28" },
      { speaker: "lead", text: "Today if possible. We have two little kids and it's unbearable in here.", timestamp: "0:32" },
      { speaker: "ai", text: "Completely understand. What kind of budget are you working with for a repair or potential replacement?", timestamp: "0:37" },
      { speaker: "lead", text: "If it's a repair, hopefully under two grand. If we need a new unit, I know that could be up to five thousand.", timestamp: "0:43" },
      { speaker: "ai", text: "Have you contacted any other HVAC companies today?", timestamp: "0:48" },
      { speaker: "lead", text: "I've got two other requests out there but nobody has called yet.", timestamp: "0:52" },
      { speaker: "ai", text: "Well you're our priority. Mike will reach out to you shortly to get a technician scheduled. Sit tight, James.", timestamp: "0:56" },
      { speaker: "lead", text: "Appreciate the quick call back. Thanks.", timestamp: "1:01" },
    ],
    timeline: [
      { type: "received", time: "2026-03-08T14:45:00Z", detail: "Lead received from Angi" },
      { type: "ai_called", time: "2026-03-08T14:45:22Z", detail: "AI dialed James Rodriguez in 22 seconds" },
      { type: "call_completed", time: "2026-03-08T14:46:25Z", detail: "Call completed — 1 min 3 sec" },
      { type: "scored", time: "2026-03-08T14:46:28Z", detail: "Scored HOT — AC dead in summer, family with kids" },
      { type: "sms_sent", time: "2026-03-08T14:46:33Z", detail: "SMS briefing sent to Mike" },
    ],
  },

  {
    id: "lead-003",
    name: "Linda Chen",
    phone: "555-609-8472",
    email: "linda.chen@outlook.com",
    address: "7340 N Dreamy Draw Dr, Phoenix, AZ 85020",
    service: "electrical",
    platform: "Thumbtack",
    score: "HOT",
    status: "booked",
    responseTime: 15,
    createdAt: "2026-03-07T10:30:00Z",
    description:
      "My electrical panel is sparking when I flip certain breakers. I can smell burning plastic. This is a serious safety hazard and I need an electrician immediately.",
    facts: {
      urgency: "HIGH",
      budget: "$800–$2,500",
      competingQuotes: 0,
      propertyType: "Single Family",
    },
    transcript: [
      { speaker: "ai", text: "Hi there, this is the InLeads assistant calling on behalf of Mike's Plumbing & Home Services. Is this Linda?", timestamp: "0:00" },
      { speaker: "lead", text: "Yes, hi. I'm really worried about my electrical panel.", timestamp: "0:04" },
      { speaker: "ai", text: "I understand your concern. You mentioned sparking — is it still happening right now?", timestamp: "0:08" },
      { speaker: "lead", text: "I turned off the main breaker for now because I could smell burning plastic. I'm afraid to turn it back on.", timestamp: "0:14" },
      { speaker: "ai", text: "That was smart to shut it off. How old is your home and do you know when the panel was last serviced?", timestamp: "0:20" },
      { speaker: "lead", text: "The house was built in 1987 and I don't think the panel has ever been replaced.", timestamp: "0:26" },
      { speaker: "ai", text: "Okay, that's almost 40 years old. You may need a panel upgrade. Do you need someone out today?", timestamp: "0:31" },
      { speaker: "lead", text: "Yes, today. I don't have any power right now because I'm afraid to turn the main back on.", timestamp: "0:36" },
      { speaker: "ai", text: "Of course. Do you have a rough budget in mind?", timestamp: "0:40" },
      { speaker: "lead", text: "I honestly have no idea what this costs. Maybe somewhere between eight hundred and twenty-five hundred?", timestamp: "0:45" },
      { speaker: "ai", text: "That's a reasonable range. Have you called any other electricians?", timestamp: "0:50" },
      { speaker: "lead", text: "No, you're the first ones to call me back. I just submitted the request a few minutes ago.", timestamp: "0:54" },
      { speaker: "ai", text: "Perfect. Mike is going to call you right back to get someone out there today. Stay away from the panel in the meantime.", timestamp: "0:58" },
      { speaker: "lead", text: "Thank you so much. I really appreciate the fast response.", timestamp: "1:03" },
    ],
    timeline: [
      { type: "received", time: "2026-03-07T10:30:00Z", detail: "Lead received from Thumbtack" },
      { type: "ai_called", time: "2026-03-07T10:30:15Z", detail: "AI dialed Linda Chen in 15 seconds" },
      { type: "call_completed", time: "2026-03-07T10:31:20Z", detail: "Call completed — 1 min 5 sec" },
      { type: "scored", time: "2026-03-07T10:31:23Z", detail: "Scored HOT — safety hazard, no competing quotes" },
      { type: "sms_sent", time: "2026-03-07T10:31:28Z", detail: "SMS briefing sent to Mike" },
    ],
  },

  {
    id: "lead-004",
    name: "Robert Davis",
    phone: "555-382-6195",
    email: "rdavis74@gmail.com",
    address: "2955 S Rural Rd, Tempe, AZ 85282",
    service: "plumbing",
    platform: "Yelp",
    score: "HOT",
    status: "new",
    responseTime: 20,
    createdAt: "2026-03-09T07:05:00Z",
    description:
      "Pipe burst in the basement. Water is flooding everywhere. I need an emergency plumber right now. Already shut off the main water line but the damage is spreading.",
    facts: {
      urgency: "HIGH",
      budget: "$1,000–$2,500",
      competingQuotes: 1,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-09T07:05:00Z", detail: "Lead received from Yelp" },
      { type: "ai_called", time: "2026-03-09T07:05:20Z", detail: "AI dialed Robert Davis in 20 seconds" },
      { type: "call_completed", time: "2026-03-09T07:06:15Z", detail: "Call completed — 55 sec" },
      { type: "scored", time: "2026-03-09T07:06:18Z", detail: "Scored HOT — burst pipe, active flooding" },
      { type: "sms_sent", time: "2026-03-09T07:06:23Z", detail: "SMS briefing sent to Mike" },
    ],
  },

  {
    id: "lead-005",
    name: "Amanda Foster",
    phone: "555-914-7253",
    email: "amanda.foster@icloud.com",
    address: "8812 N Central Ave, Phoenix, AZ 85020",
    service: "plumbing",
    platform: "Angi",
    score: "HOT",
    status: "qualified",
    responseTime: 25,
    createdAt: "2026-03-08T09:22:00Z",
    description:
      "I smell gas near my water heater. I've opened windows and turned off the gas valve but I'm not sure if there's a leak in the line. Need someone to inspect and fix today.",
    facts: {
      urgency: "HIGH",
      budget: "$500–$1,500",
      competingQuotes: 0,
      propertyType: "Townhouse",
    },
    timeline: [
      { type: "received", time: "2026-03-08T09:22:00Z", detail: "Lead received from Angi" },
      { type: "ai_called", time: "2026-03-08T09:22:25Z", detail: "AI dialed Amanda Foster in 25 seconds" },
      { type: "call_completed", time: "2026-03-08T09:23:30Z", detail: "Call completed — 1 min 5 sec" },
      { type: "scored", time: "2026-03-08T09:23:33Z", detail: "Scored HOT — gas leak, safety emergency" },
      { type: "sms_sent", time: "2026-03-08T09:23:38Z", detail: "SMS briefing sent to Mike" },
    ],
  },

  // ── WARM leads (6) ───────────────────────────────────────────────────────

  {
    id: "lead-006",
    name: "Michael Torres",
    phone: "555-471-3829",
    email: "mtorres22@gmail.com",
    address: "3401 W Thunderbird Rd, Phoenix, AZ 85053",
    service: "roofing",
    platform: "Thumbtack",
    score: "WARM",
    status: "called",
    responseTime: 35,
    createdAt: "2026-03-07T16:10:00Z",
    description:
      "We had a big storm last night and I noticed a few shingles missing from the roof. No leaking yet but I want to get it inspected before the next rain.",
    facts: {
      urgency: "MEDIUM",
      budget: "$500–$1,200",
      competingQuotes: 2,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-07T16:10:00Z", detail: "Lead received from Thumbtack" },
      { type: "ai_called", time: "2026-03-07T16:10:35Z", detail: "AI dialed Michael Torres in 35 seconds" },
      { type: "call_completed", time: "2026-03-07T16:11:40Z", detail: "Call completed — 1 min 5 sec" },
      { type: "scored", time: "2026-03-07T16:11:43Z", detail: "Scored WARM — storm damage, not yet leaking" },
    ],
  },

  {
    id: "lead-007",
    name: "Karen Williams",
    phone: "555-836-2047",
    email: "karen.w@hotmail.com",
    address: "5520 E Indian School Rd, Phoenix, AZ 85018",
    service: "painting",
    platform: "Angi",
    score: "WARM",
    status: "qualified",
    responseTime: 42,
    createdAt: "2026-03-06T11:30:00Z",
    description:
      "Looking to get three rooms painted — living room, master bedroom, and a small office. Currently have beige walls and want to go with a modern gray/white palette.",
    facts: {
      urgency: "MEDIUM",
      budget: "$1,200–$2,000",
      competingQuotes: 3,
      propertyType: "Condo",
    },
    timeline: [
      { type: "received", time: "2026-03-06T11:30:00Z", detail: "Lead received from Angi" },
      { type: "ai_called", time: "2026-03-06T11:30:42Z", detail: "AI dialed Karen Williams in 42 seconds" },
      { type: "call_completed", time: "2026-03-06T11:31:50Z", detail: "Call completed — 1 min 8 sec" },
      { type: "scored", time: "2026-03-06T11:31:53Z", detail: "Scored WARM — planned project, multiple quotes" },
    ],
  },

  {
    id: "lead-008",
    name: "David Kim",
    phone: "555-192-5634",
    email: "david.kim.az@gmail.com",
    address: "1420 S Mill Ave, Tempe, AZ 85281",
    service: "plumbing",
    platform: "Yelp",
    score: "WARM",
    status: "new",
    responseTime: 38,
    createdAt: "2026-03-05T09:00:00Z",
    description:
      "Water heater is about 15 years old and starting to make rumbling noises. Not an emergency yet but I'd like to replace it before it fails. Interested in tankless options.",
    facts: {
      urgency: "MEDIUM",
      budget: "$1,800–$3,500",
      competingQuotes: 2,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-05T09:00:00Z", detail: "Lead received from Yelp" },
      { type: "ai_called", time: "2026-03-05T09:00:38Z", detail: "AI dialed David Kim in 38 seconds" },
      { type: "call_completed", time: "2026-03-05T09:01:45Z", detail: "Call completed — 1 min 7 sec" },
      { type: "scored", time: "2026-03-05T09:01:48Z", detail: "Scored WARM — proactive replacement, good budget" },
    ],
  },

  {
    id: "lead-009",
    name: "Jennifer Adams",
    phone: "555-627-8901",
    email: "jen.adams@gmail.com",
    address: "6630 N Scottsdale Rd, Scottsdale, AZ 85250",
    service: "remodeling",
    platform: "Thumbtack",
    score: "WARM",
    status: "called",
    responseTime: 45,
    createdAt: "2026-03-05T14:20:00Z",
    description:
      "Want to remodel my guest bathroom. Looking to replace the vanity, re-tile the shower, and update fixtures. The bathroom is about 60 square feet.",
    facts: {
      urgency: "MEDIUM",
      budget: "$4,000–$8,000",
      competingQuotes: 3,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-05T14:20:00Z", detail: "Lead received from Thumbtack" },
      { type: "ai_called", time: "2026-03-05T14:20:45Z", detail: "AI dialed Jennifer Adams in 45 seconds" },
      { type: "call_completed", time: "2026-03-05T14:21:52Z", detail: "Call completed — 1 min 7 sec" },
      { type: "scored", time: "2026-03-05T14:21:55Z", detail: "Scored WARM — bathroom remodel, shopping around" },
    ],
  },

  {
    id: "lead-010",
    name: "Chris Johnson",
    phone: "555-305-4178",
    email: "chrisjohnson@gmail.com",
    address: "4210 W Glendale Ave, Glendale, AZ 85301",
    service: "carpentry",
    platform: "Angi",
    score: "WARM",
    status: "new",
    responseTime: 40,
    createdAt: "2026-03-04T08:45:00Z",
    description:
      "The deck boards on my back patio are warped and a couple of the railing posts are loose. Looking for someone to repair or possibly rebuild the deck. About 200 square feet.",
    facts: {
      urgency: "MEDIUM",
      budget: "$2,000–$4,500",
      competingQuotes: 1,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-04T08:45:00Z", detail: "Lead received from Angi" },
      { type: "ai_called", time: "2026-03-04T08:45:40Z", detail: "AI dialed Chris Johnson in 40 seconds" },
      { type: "call_completed", time: "2026-03-04T08:46:48Z", detail: "Call completed — 1 min 8 sec" },
      { type: "scored", time: "2026-03-04T08:46:51Z", detail: "Scored WARM — deck repair, reasonable budget" },
    ],
  },

  {
    id: "lead-011",
    name: "Patricia Brown",
    phone: "555-748-2036",
    email: "p.brown55@yahoo.com",
    address: "9125 E Via Linda, Scottsdale, AZ 85258",
    service: "plumbing",
    platform: "Thumbtack",
    score: "WARM",
    status: "qualified",
    responseTime: 33,
    createdAt: "2026-03-03T13:15:00Z",
    description:
      "Kitchen sink and bathtub are both draining very slowly. Tried Drano but it didn't help. Think there might be a clog deeper in the line. Would like someone within the next couple of days.",
    facts: {
      urgency: "MEDIUM",
      budget: "$200–$500",
      competingQuotes: 1,
      propertyType: "Townhouse",
    },
    timeline: [
      { type: "received", time: "2026-03-03T13:15:00Z", detail: "Lead received from Thumbtack" },
      { type: "ai_called", time: "2026-03-03T13:15:33Z", detail: "AI dialed Patricia Brown in 33 seconds" },
      { type: "call_completed", time: "2026-03-03T13:16:38Z", detail: "Call completed — 1 min 5 sec" },
      { type: "scored", time: "2026-03-03T13:16:41Z", detail: "Scored WARM — slow drain, not emergency" },
    ],
  },

  // ── COLD leads (4) ───────────────────────────────────────────────────────

  {
    id: "lead-012",
    name: "Steven Clark",
    phone: "555-563-9014",
    email: "sclark_az@gmail.com",
    address: "2780 W Peoria Ave, Phoenix, AZ 85029",
    service: "HVAC",
    platform: "Yelp",
    score: "COLD",
    status: "lost",
    responseTime: 55,
    createdAt: "2026-03-04T17:30:00Z",
    description:
      "Just wondering what the going rate is for an HVAC tune-up. No issues right now, just want to get pricing for later this year before summer hits.",
    facts: {
      urgency: "LOW",
      budget: "$100–$200",
      competingQuotes: 4,
      propertyType: "Condo",
    },
    timeline: [
      { type: "received", time: "2026-03-04T17:30:00Z", detail: "Lead received from Yelp" },
      { type: "ai_called", time: "2026-03-04T17:30:55Z", detail: "AI dialed Steven Clark in 55 seconds" },
      { type: "call_completed", time: "2026-03-04T17:31:50Z", detail: "Call completed — 55 sec" },
      { type: "scored", time: "2026-03-04T17:31:53Z", detail: "Scored COLD — price shopping, no urgency" },
    ],
  },

  {
    id: "lead-013",
    name: "Nancy Lee",
    phone: "555-421-7836",
    email: "nancylee@gmail.com",
    address: "1855 E Guadalupe Rd, Tempe, AZ 85283",
    service: "painting",
    platform: "Thumbtack",
    score: "COLD",
    status: "lost",
    responseTime: 48,
    createdAt: "2026-03-03T15:40:00Z",
    description:
      "Just browsing for painters. Thinking about maybe painting the exterior of the house sometime this fall. No rush at all, just collecting names.",
    facts: {
      urgency: "LOW",
      budget: "$3,000–$6,000",
      competingQuotes: 4,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-03T15:40:00Z", detail: "Lead received from Thumbtack" },
      { type: "ai_called", time: "2026-03-03T15:40:48Z", detail: "AI dialed Nancy Lee in 48 seconds" },
      { type: "call_completed", time: "2026-03-03T15:41:40Z", detail: "Call completed — 52 sec" },
      { type: "scored", time: "2026-03-03T15:41:43Z", detail: "Scored COLD — just browsing, fall timeline" },
    ],
  },

  {
    id: "lead-014",
    name: "Tom Wilson",
    phone: "555-289-6503",
    email: "twilson@protonmail.com",
    address: "3670 S 16th St, Phoenix, AZ 85040",
    service: "electrical",
    platform: "Angi",
    score: "COLD",
    status: "called",
    responseTime: 50,
    createdAt: "2026-03-06T13:00:00Z",
    description:
      "Want to get a quote for adding a couple of outlets in my garage and maybe an EV charger outlet. Not urgent — just price shopping for now.",
    facts: {
      urgency: "LOW",
      budget: "$300–$800",
      competingQuotes: 3,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-06T13:00:00Z", detail: "Lead received from Angi" },
      { type: "ai_called", time: "2026-03-06T13:00:50Z", detail: "AI dialed Tom Wilson in 50 seconds" },
      { type: "call_completed", time: "2026-03-06T13:01:48Z", detail: "Call completed — 58 sec" },
      { type: "scored", time: "2026-03-06T13:01:51Z", detail: "Scored COLD — price shopping, no urgency" },
    ],
  },

  {
    id: "lead-015",
    name: "Emily Martinez",
    phone: "555-134-7892",
    email: "emartinez@icloud.com",
    address: "7920 E Thomas Rd, Scottsdale, AZ 85251",
    service: "remodeling",
    platform: "Yelp",
    score: "COLD",
    status: "new",
    responseTime: 52,
    createdAt: "2026-03-05T18:00:00Z",
    description:
      "Thinking about a kitchen remodel maybe next year. Just starting to research what it might cost to redo cabinets and countertops. Very early stage.",
    facts: {
      urgency: "LOW",
      budget: "$10,000–$20,000",
      competingQuotes: 4,
      propertyType: "Single Family",
    },
    timeline: [
      { type: "received", time: "2026-03-05T18:00:00Z", detail: "Lead received from Yelp" },
      { type: "ai_called", time: "2026-03-05T18:00:52Z", detail: "AI dialed Emily Martinez in 52 seconds" },
      { type: "call_completed", time: "2026-03-05T18:01:45Z", detail: "Call completed — 53 sec" },
      { type: "scored", time: "2026-03-05T18:01:48Z", detail: "Scored COLD — future project, early research" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Daily Stats — March 3–9, 2026
// ---------------------------------------------------------------------------

export const dailyStats: DailyStats[] = [
  { day: "Mon 3/3", leads: 4, hot: 1, warm: 2, cold: 1 },
  { day: "Tue 3/4", leads: 3, hot: 1, warm: 1, cold: 1 },
  { day: "Wed 3/5", leads: 5, hot: 2, warm: 2, cold: 1 },
  { day: "Thu 3/6", leads: 2, hot: 0, warm: 1, cold: 1 },
  { day: "Fri 3/7", leads: 4, hot: 1, warm: 2, cold: 1 },
  { day: "Sat 3/8", leads: 1, hot: 1, warm: 0, cold: 0 },
  { day: "Sun 3/9", leads: 3, hot: 1, warm: 1, cold: 1 },
];

// ---------------------------------------------------------------------------
// Activity Feed — 10 recent items
// ---------------------------------------------------------------------------

export const activityFeed: ActivityItem[] = [
  {
    id: "act-001",
    type: "call",
    message: "AI called Sarah Mitchell — emergency water heater burst",
    time: "2 min ago",
    leadId: "lead-001",
  },
  {
    id: "act-002",
    type: "score",
    message: "Lead scored HOT — Sarah Mitchell",
    time: "2 min ago",
    leadId: "lead-001",
  },
  {
    id: "act-003",
    type: "sms",
    message: "SMS briefing sent for Sarah Mitchell",
    time: "2 min ago",
    leadId: "lead-001",
  },
  {
    id: "act-004",
    type: "call",
    message: "AI called Robert Davis — burst pipe in basement",
    time: "15 min ago",
    leadId: "lead-004",
  },
  {
    id: "act-005",
    type: "score",
    message: "Lead scored HOT — Robert Davis",
    time: "15 min ago",
    leadId: "lead-004",
  },
  {
    id: "act-006",
    type: "sms",
    message: "SMS briefing sent for James Rodriguez",
    time: "1 hour ago",
    leadId: "lead-002",
  },
  {
    id: "act-007",
    type: "booked",
    message: "Linda Chen marked as Booked — electrical panel repair",
    time: "3 hours ago",
    leadId: "lead-003",
  },
  {
    id: "act-008",
    type: "call",
    message: "AI called Amanda Foster — gas leak smell",
    time: "5 hours ago",
    leadId: "lead-005",
  },
  {
    id: "act-009",
    type: "lost",
    message: "Steven Clark marked as Lost — price inquiry only",
    time: "8 hours ago",
    leadId: "lead-012",
  },
  {
    id: "act-010",
    type: "score",
    message: "Lead scored WARM — Karen Williams",
    time: "1 day ago",
    leadId: "lead-007",
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Appointments — March 9–15, 2026
// ---------------------------------------------------------------------------

export const appointments: Appointment[] = [
  { id: "appt-001", leadId: "lead-003", leadName: "Linda Chen", service: "electrical", score: "HOT", address: "7340 N Dreamy Draw Dr, Phoenix, AZ", status: "completed", date: "2026-03-09", startTime: "10:00", endTime: "11:30", notes: "Electrical panel sparking — safety inspection." },
  { id: "appt-002", leadId: "lead-001", leadName: "Sarah Mitchell", service: "plumbing", score: "HOT", address: "4821 E Baseline Rd, Phoenix, AZ", status: "confirmed", date: "2026-03-09", startTime: "14:00", endTime: "15:30", notes: "Emergency water heater replacement. 50-gal Rheem." },
  { id: "appt-003", leadId: "lead-005", leadName: "Amanda Foster", service: "plumbing", score: "HOT", address: "8812 N Central Ave, Phoenix, AZ", status: "pending", date: "2026-03-10", startTime: "08:30", endTime: "09:30", notes: "Gas leak inspection near water heater." },
  { id: "appt-004", leadId: "lead-002", leadName: "James Rodriguez", service: "HVAC", score: "HOT", address: "1130 W Camelback Rd, Phoenix, AZ", status: "pending", date: "2026-03-10", startTime: "13:00", endTime: "14:30", notes: "AC unit dead — 15yr Trane. Emergency assessment." },
  { id: "appt-005", leadId: "lead-004", leadName: "Robert Davis", service: "plumbing", score: "HOT", address: "2955 S Rural Rd, Tempe, AZ", status: "confirmed", date: "2026-03-11", startTime: "09:00", endTime: "10:30", notes: "Burst pipe in basement. Water damage assessment." },
  { id: "appt-006", leadId: "lead-007", leadName: "Karen Williams", service: "painting", score: "WARM", address: "5520 E Indian School Rd, Phoenix, AZ", status: "confirmed", date: "2026-03-11", startTime: "14:00", endTime: "15:00", notes: "Interior painting estimate — 3 rooms." },
  { id: "appt-007", leadId: "lead-011", leadName: "Patricia Brown", service: "plumbing", score: "WARM", address: "9125 E Via Linda, Scottsdale, AZ", status: "pending", date: "2026-03-12", startTime: "10:00", endTime: "11:00", notes: "Slow drains — kitchen and bathtub." },
  { id: "appt-008", leadId: "lead-006", leadName: "Michael Torres", service: "roofing", score: "WARM", address: "3401 W Thunderbird Rd, Phoenix, AZ", status: "confirmed", date: "2026-03-13", startTime: "08:00", endTime: "09:30", notes: "Storm damage roof inspection." },
  { id: "appt-009", leadId: "lead-009", leadName: "Jennifer Adams", service: "remodeling", score: "WARM", address: "6630 N Scottsdale Rd, Scottsdale, AZ", status: "confirmed", date: "2026-03-14", startTime: "11:00", endTime: "12:30", notes: "Guest bathroom remodel consultation." },
  { id: "appt-010", leadId: "lead-008", leadName: "David Kim", service: "plumbing", score: "WARM", address: "1420 S Mill Ave, Tempe, AZ", status: "pending", date: "2026-03-15", startTime: "10:00", endTime: "11:00", notes: "Water heater consultation — tankless options." },
];

export function getAppointmentsByDate(date: string): Appointment[] {
  return appointments.filter((a) => a.date === date);
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getLeadById(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function getLeadsByScore(score: LeadScore): Lead[] {
  return leads.filter((l) => l.score === score);
}

export function getRecentLeads(count: number): Lead[] {
  return [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, count);
}
