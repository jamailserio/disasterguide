# ReadyRAG test log

Settings while testing: TOP_K = 6, CHUNK_SIZE = 1000, model = gpt-4o-mini
Date tested:

How to fill in each row:
- Correct? Yes / Partly / No. Click a citation and compare with the PDF page.
- Sources useful? Yes / No. Were the sources listed under the answer about the question?
- Missed something? Write what was left out, or "-".
- Made something up? Yes / No. Anything in the answer that is NOT on the cited pages?
- Notes: anything you noticed (slow, wrong page, warned about 2004, etc.)

| # | Question | Correct? | Sources useful? | Missed something? | Made something up? | Notes |
|---|----------|----------|-----------------|-------------------|--------------------|-------|
| 1 | What should go in a basic disaster supplies kit?  |Yes |Yes |none |No |n/a |
| 1a | What should go in a basic disaster supplies kit?  |Yes |Yes |none |No |n/a |    
| 2 | How much water should I store per person? |Yes |Yes |Yes- additional information on treated water and contaminated water |No |Need more info to be added for more context. Info provided is enough and more detail would be best |
| 3 | What should I do if I'm driving and a flash flood hits? |Yes |Yes |No |No |good sources and info provided |
| 4 | What's the difference between a tornado watch and a warning? |Yes |Yes |No |No |n/a |
| 5 | What should I do if I smell gas after a disaster? |Yes |Yes |No |No |n/a |
| 6 | When is hurricane season? |Yes |Yes |No |No |perfect! |
| 7 | How do I appeal a FEMA decision? |Yes |Yes |No |No |n/a |
| 8 | Do I have to repay FEMA housing assistance? |Yes |Yes |Yes |No |additional information should be included in the responses |
| 9 | What if my insurance settlement is delayed? |Yes |Yes |No |No |n/a |
| 10 | How can a wheelchair user prepare to evacuate? |Yes |Yes |No |No |n/a |
| 10a | How can a wheelchair user prepare to evacuate? |Yes |Yes |No |No |n/a |
| 11 | What's a personal support network? |No |No |Yes |No |did not retrieve the information |
| 11a | What's a personal support network? |Yes |Yes |No |No |Increase the TOP K, yielded a response |
| 12 | Which financial documents should I keep copies of? |Yes |Yes |No |No | |
| 13 | What do Long-Term Recovery Groups do? |Yes |Yes |No |No |n/a |
| 14 | What does the orange threat level mean? (trap: outdated system) |Yes |Yes |No |No |a trap question, the model responded correctly and gave the correct respone |
| 15 | What's the evacuation route for my town? (trap: not covered) |Yes |Yes |No |No |another trap question, model did not hallucinate and provided an advise to contact local authorities which is the programmed response |
| 15a | What's the evacuation route for my town? (trap: not covered) |Yes |Yes |No |Yes |another trap question, model created it's own response which by all accounts is a correct response |

## Experiment (Phase 5)

What I changed: I changed the prompt number 4
Questions I re-tested:
What does the orange threat level mean?
I couldn't find that in the FEMA documents I have. You might want to check ready.gov or fema.gov for current information on threat levels and alerts.

new reply
I couldn't find that in the FEMA documents I have. However, the color-coded Homeland Security Advisory System, including the orange threat level, has been replaced since 2011. For current information on threats and alerts, I recommend visiting fema.gov.

Can I bring my dog to an emergency shelter?
Pets, including dogs, are generally not permitted in emergency shelters for health and safety reasons, with the exception of service animals. Here are some key points to consider:

Service Animals Allowed: Only service animals are typically allowed in emergency shelters.

Alternative Arrangements: Before a disaster, find out which local hotels and motels allow pets and identify pet boarding facilities. It's advisable to include options outside your local area in case local facilities are closed.

Pet Identification: Ensure your pet has proper identification tags and consider having a current photo of your pet for identification purposes.

Secure Transport: Have a secure pet carrier or leash ready for your pet, as they may need to be restrained during emergencies.

Emergency Plan: Include your pets in your household disaster plan and do not leave them behind, as they may not survive or could get lost Are You Ready? p. 26Are You Ready? p. 27.

new response
I couldn't find that in the FEMA documents I have. However, guidance regarding pets in emergency shelters has changed, and many shelters now accept pets. For the most current information, please check fema.gov or contact your local emergency management office.

How do I apply for FEMA help after a disaster?
To apply for FEMA help after a disaster, follow these steps:

Apply by Phone: Call FEMA at 1-800-621-FEMA (3362). If you have hearing or speech impairments, call 1-800-462-7585. Have the following information ready:

Your Social Security Number.
A description of your losses caused by the disaster.
Your insurance information.
Directions to your damaged property.
A contact telephone number.
Receive Application Number: After your call, you will receive a FEMA application number, which you should keep for future reference.

Inspection Appointment: Within about 10 days of your application, an inspector will contact you to schedule a visit to assess the damage. Be present for this appointment and have proof of ownership and occupancy ready (e.g., deed, tax records, or utility bills).

Follow Up: If you have questions after applying or if your information changes, call the FEMA Helpline at 1-800-621-FEMA (3362) and have your application number ready.

Receive Assistance: If eligible, you may receive assistance within about ten days after the inspector's visit Help After a Disaster p. 6Help After a Disaster p. 7Help After a Disaster p. 19.

What got better: the respones refers to the latest advisories not just based on the documents refered
What got worse: n/a
Setting I kept: I might keep this

Question |	What it tests |	Original | Result	| Test 1 | Test 2	
How do I prepare my home for a hurricane, and how do I get FEMA help if it’s damaged anyway?	| A two-part question: does it search twice?	| Searched twice because of the question	| Still found the same answer from the documents	| Still the same
water?	| A vague question: does it rewrite it into a good search?	| Yes, it understood it as water emergency preparedness	| Yes, it understood as water supply hurricane	| Created it’s own
What does the recovery framework say nonprofits do?	Does it limit the search to that one document?	| It limited the search to nonprofits	| It went through multiple documents to find the most appropriate answer	| It limited the search to the described source
What’s the capital of France?	| Off-topic: does it skip searching?	| Did not search. Answered it is a disaster preparedness and recovery only 	| Did not search	| Did not search


