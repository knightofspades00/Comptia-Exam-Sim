/* =========================================================================
   Question supplements — multi-response, drag-and-drop, and PBQ questions
   authored specifically for the Exam Portal (not auto-extracted).

   Loaded AFTER the auto-generated pool files in exam.html, so these
   questions get APPENDED to window.QUESTION_POOLS[examId] without
   conflicting with the regenerator.

   Edit this file directly. It is NOT touched by _extract_questions.py.
   ========================================================================= */

(function appendSupplements() {
  window.QUESTION_POOLS = window.QUESTION_POOLS || {};
  function add(examId, items) {
    window.QUESTION_POOLS[examId] = (window.QUESTION_POOLS[examId] || []).concat(items);
  }

  /* ----------------- Tech+ (FC0-U71) ---------------------------------------
     Real Tech+ format includes MC + multi-response + drag-and-drop (no PBQs).
  */
  add('techplus', [
    // Multi-response
    { type: 'multi', selectCount: 2, domain: 'D6',
      q: 'Which TWO of the following are examples of multi-factor authentication?',
      opts: [
        'Password and a 6-digit code from an authenticator app',
        'Two different passwords for the same account',
        'A fingerprint and a hardware security key',
        'A password that is changed every 30 days',
        'A username and a password'
      ],
      answer: [0, 2],
      exp: 'MFA requires factors from at least two different categories: know (password), have (token/app/key), are (biometric). Two passwords or password rotation alone are still single-factor.'
    },
    { type: 'multi', selectCount: 2, domain: 'D2',
      q: 'Which TWO devices are typically used to extend a wired network?',
      opts: ['Router', 'Switch', 'Modem', 'Webcam', 'Printer'],
      answer: [0, 1],
      exp: 'Routers and switches forward traffic. A modem connects the network to an ISP; webcams and printers are end devices, not network extenders.'
    },
    { type: 'multi', selectCount: 3, domain: 'D5',
      q: 'Select THREE characteristics of structured data.',
      opts: [
        'Stored in rows and columns',
        'Includes fields with defined data types',
        'Examples include photos and audio recordings',
        'Queried using SQL',
        'Has no predefined schema'
      ],
      answer: [0, 1, 3],
      exp: 'Structured data lives in rows and columns with defined fields and types, and is queried with SQL. Photos/audio without metadata are unstructured.'
    },
    { type: 'multi', selectCount: 2, domain: 'D4',
      q: 'Which TWO are control structures in programming?',
      opts: ['Loop', 'Variable', 'Branching (if/else)', 'Constant', 'Comment'],
      answer: [0, 2],
      exp: 'Loops and branching control which code runs and how often. Variables and constants store values; comments are notes ignored by the interpreter/compiler.'
    },
    // Drag-and-drop matching
    { type: 'dnd-match', domain: 'D2',
      q: 'Match each component to its category.',
      items: [
        { id: 'cpu',     label: 'CPU' },
        { id: 'monitor', label: 'Monitor' },
        { id: 'mouse',   label: 'Mouse' },
        { id: 'ssd',     label: 'SSD' }
      ],
      buckets: [
        { id: 'process', label: 'Processing' },
        { id: 'input',   label: 'Input' },
        { id: 'output',  label: 'Output' },
        { id: 'storage', label: 'Storage' }
      ],
      correct: { cpu: 'process', monitor: 'output', mouse: 'input', ssd: 'storage' },
      exp: 'CPU is the processor; a monitor displays output; a mouse provides input; an SSD stores data persistently.'
    },
    { type: 'dnd-match', domain: 'D6',
      q: 'Match each authentication factor to its category.',
      items: [
        { id: 'password',    label: 'Password' },
        { id: 'fingerprint', label: 'Fingerprint' },
        { id: 'smartcard',   label: 'Smart card' },
        { id: 'pin',         label: 'PIN' }
      ],
      buckets: [
        { id: 'know', label: 'Something you KNOW' },
        { id: 'have', label: 'Something you HAVE' },
        { id: 'are',  label: 'Something you ARE' }
      ],
      correct: { password: 'know', fingerprint: 'are', smartcard: 'have', pin: 'know' },
      exp: 'Passwords and PINs are knowledge factors; smart cards/security keys/phones are possession; biometrics like fingerprint or face are inherence.'
    }
  ]);

  /* ----------------- A+ Core 1 (220-1101) ---------------------------------- */
  add('aplus1', [
    // Multi-response
    { type: 'multi', selectCount: 2, domain: 'D3',
      q: 'A technician needs to install RAM in a desktop. Which TWO factors must match the motherboard?',
      opts: [
        'DDR generation (e.g., DDR4 vs DDR5)',
        'Color of the heatspreader',
        'Form factor (DIMM vs SO-DIMM)',
        'Brand of the CPU',
        'Whether ECC is supported by the board'
      ],
      answer: [0, 2],
      exp: 'DDR generation and form factor MUST match. ECC support matters too but only if the system requires/supports ECC. Color is cosmetic; CPU brand does not dictate RAM module physical fit.'
    },
    { type: 'multi', selectCount: 2, domain: 'D5',
      q: 'A workstation will not POST. Select TWO things the technician should check FIRST.',
      opts: [
        'Power supply connections to the motherboard',
        'The Windows registry',
        'RAM is fully seated in the DIMM slots',
        'Whether SQL Server is installed',
        'Browser extensions'
      ],
      answer: [0, 2],
      exp: 'No POST = no power-on self-test, so the OS/registry has not even loaded. Hardware checks first: power and seated components (RAM, GPU, CPU).'
    },
    { type: 'multi', selectCount: 2, domain: 'D2',
      q: 'Which TWO are commonly used to connect a wired client to a SOHO network?',
      opts: ['RJ-45 patch cable', 'HDMI cable', 'Coaxial cable for cable internet to the modem', 'VGA cable', '3.5mm audio jack'],
      answer: [0, 2],
      exp: 'RJ-45 (Cat 5e/6) connects the client to a switch/router; coaxial brings the ISP feed to a cable modem. HDMI/VGA/3.5mm are display/audio.'
    },
    { type: 'multi', selectCount: 3, domain: 'D4',
      q: 'Select THREE benefits of virtualization for IT operations.',
      opts: [
        'Consolidates multiple servers onto fewer physical hosts',
        'Eliminates the need for backups',
        'Snapshots allow quick rollback after changes',
        'Improves test/dev isolation from production',
        'Removes the need for an OS'
      ],
      answer: [0, 2, 3],
      exp: 'Consolidation, snapshots/rollback, and isolated test/dev are core benefits. Each VM still has its own OS, and backups remain essential.'
    },
    // Drag-and-drop
    { type: 'dnd-match', domain: 'D2',
      q: 'Match each port/protocol to its default TCP/UDP port number.',
      items: [
        { id: 'http',  label: 'HTTP' },
        { id: 'https', label: 'HTTPS' },
        { id: 'ssh',   label: 'SSH' },
        { id: 'rdp',   label: 'RDP' },
        { id: 'dns',   label: 'DNS' }
      ],
      buckets: [
        { id: 'p22',   label: 'Port 22' },
        { id: 'p53',   label: 'Port 53' },
        { id: 'p80',   label: 'Port 80' },
        { id: 'p443',  label: 'Port 443' },
        { id: 'p3389', label: 'Port 3389' }
      ],
      correct: { http: 'p80', https: 'p443', ssh: 'p22', rdp: 'p3389', dns: 'p53' },
      exp: 'HTTP=80, HTTPS=443, SSH=22, RDP=3389, DNS=53. These are some of the most-tested defaults on A+ Core 1.'
    },
    { type: 'dnd-match', domain: 'D3',
      q: 'Match each storage interface to its typical maximum sequential read speed (consumer).',
      items: [
        { id: 'hdd',  label: '7200 RPM HDD' },
        { id: 'sata', label: 'SATA III SSD' },
        { id: 'nvme', label: 'PCIe 4.0 NVMe SSD' }
      ],
      buckets: [
        { id: 's_slow', label: '~150 MB/s' },
        { id: 's_med',  label: '~550 MB/s' },
        { id: 's_fast', label: '~5,000+ MB/s' }
      ],
      correct: { hdd: 's_slow', sata: 's_med', nvme: 's_fast' },
      exp: 'HDDs are mechanical and slow (~150 MB/s). SATA SSDs are capped by the SATA III bus (~550 MB/s). NVMe runs straight on PCIe and reaches several GB/s.'
    },
    // PBQ
    { type: 'pbq', domain: 'D5',
      q: 'PBQ — Workstation troubleshooting: A user reports their PC powers on but shows no display. Walk through the diagnosis.',
      steps: [
        { kind: 'single',
          text: 'Step 1: What is the FIRST thing you should check?',
          opts: [
            'Replace the CPU',
            'Verify the monitor power and cable connection to the PC',
            'Reinstall Windows',
            'Order a new motherboard'
          ],
          answer: 1
        },
        { kind: 'multi', selectCount: 2,
          text: 'Step 2: Power and cable are confirmed good. Select TWO components to reseat next.',
          opts: ['RAM modules', 'Hard drive cables', 'GPU in its PCIe slot', 'Power button', 'BIOS battery'],
          answer: [0, 2]
        },
        { kind: 'dnd-match',
          text: 'Step 3: Match each symptom you might find on retry to its likely cause.',
          items: [
            { id: 'beep',  label: 'Repeating short beeps' },
            { id: 'image', label: 'Image appears after reseating GPU' },
            { id: 'nopow', label: 'Still no power at all' }
          ],
          buckets: [
            { id: 'ram',  label: 'Bad/unseated RAM' },
            { id: 'gpu',  label: 'GPU was not seated' },
            { id: 'psu',  label: 'PSU failure or unplugged' }
          ],
          correct: { beep: 'ram', image: 'gpu', nopow: 'psu' }
        }
      ],
      exp: 'CompTIA troubleshooting model: start with simple/external checks (cables), then reseat components, then interpret POST beep codes. Always test the simplest theory first.'
    }
  ]);

  /* ----------------- A+ Core 2 (220-1102) ---------------------------------- */
  add('aplus2', [
    // Multi-response
    { type: 'multi', selectCount: 2, domain: 'D2',
      q: 'Which TWO are best practices for password security?',
      opts: [
        'Use a unique long passphrase for each account',
        'Reuse one strong password everywhere',
        'Enable multi-factor authentication where available',
        'Store passwords on a sticky note',
        'Share the password only with trusted coworkers'
      ],
      answer: [0, 2],
      exp: 'Unique long passphrases + MFA are the modern guidance. Reuse leaks across breaches, sticky notes expose credentials physically, sharing breaks accountability.'
    },
    { type: 'multi', selectCount: 2, domain: 'D1',
      q: 'A user reports Windows is slow to start. Select TWO appropriate first steps.',
      opts: [
        'Disable unnecessary startup programs in Task Manager',
        'Reinstall Windows immediately',
        'Run Disk Cleanup and check for low disk space',
        'Replace the motherboard',
        'Buy a new license'
      ],
      answer: [0, 2],
      exp: 'Reducing startup load and verifying free disk space are the cheap, high-impact first steps. Reinstall/hardware swap are last resorts.'
    },
    { type: 'multi', selectCount: 3, domain: 'D2',
      q: 'Select THREE common signs of malware on a workstation.',
      opts: [
        'Sudden browser redirects to unfamiliar sites',
        'Unexpected pop-ups when no browser is open',
        'A normal Windows update notification',
        'Antivirus is disabled and cannot be re-enabled',
        'A scheduled defragmentation task'
      ],
      answer: [0, 1, 3],
      exp: 'Redirects, persistent pop-ups, and security software being disabled are classic malware indicators. Normal updates and scheduled maintenance are not.'
    },
    { type: 'multi', selectCount: 2, domain: 'D4',
      q: 'Which TWO actions follow change-management best practice when applying a new GPO?',
      opts: [
        'Document the proposed change and obtain approval',
        'Apply directly to production at peak hours without notice',
        'Pilot on a small test group before broad rollout',
        'Skip rollback planning to save time',
        'Disable logging during the change'
      ],
      answer: [0, 2],
      exp: 'Change management requires documentation/approval and a tested rollout (pilot → broad). Skipping rollback or logging defeats the point.'
    },
    // Drag-and-drop
    { type: 'dnd-match', domain: 'D2',
      q: 'Match each social-engineering attack to its delivery channel.',
      items: [
        { id: 'phish',  label: 'Phishing' },
        { id: 'vish',   label: 'Vishing' },
        { id: 'smish',  label: 'Smishing' },
        { id: 'shoulder', label: 'Shoulder surfing' }
      ],
      buckets: [
        { id: 'email',  label: 'Email' },
        { id: 'voice',  label: 'Phone call' },
        { id: 'sms',    label: 'Text (SMS)' },
        { id: 'inperson', label: 'In person' }
      ],
      correct: { phish: 'email', vish: 'voice', smish: 'sms', shoulder: 'inperson' },
      exp: 'Naming convention: vishing = voice, smishing = SMS, phishing = email (the original). Shoulder surfing is physical observation.'
    },
    { type: 'dnd-match', domain: 'D1',
      q: 'Match each Windows command-line tool to what it does.',
      items: [
        { id: 'sfc',    label: 'sfc /scannow' },
        { id: 'chkdsk', label: 'chkdsk' },
        { id: 'ipcfg',  label: 'ipconfig' },
        { id: 'gpupd',  label: 'gpupdate' }
      ],
      buckets: [
        { id: 'sysfiles', label: 'Verifies/repairs system files' },
        { id: 'diskck',   label: 'Checks disk integrity' },
        { id: 'netinfo',  label: 'Shows network config' },
        { id: 'gpols',    label: 'Refreshes group policy' }
      ],
      correct: { sfc: 'sysfiles', chkdsk: 'diskck', ipcfg: 'netinfo', gpupd: 'gpols' },
      exp: 'Memorize these: sfc for system files, chkdsk for disk, ipconfig for network state, gpupdate to pull new GPOs without a logoff.'
    },
    // PBQ
    { type: 'pbq', domain: 'D3',
      q: 'PBQ — Malware response: A user calls saying their browser keeps redirecting and they see new toolbars.',
      steps: [
        { kind: 'multi', selectCount: 3,
          text: 'Step 1: Per CompTIA malware-removal best practice, select THREE actions to take EARLY.',
          opts: [
            'Identify the symptoms',
            'Quarantine the infected system (disconnect from network)',
            'Pay any ransom that may appear',
            'Disable System Restore (Windows) before remediation',
            'Email IT a screenshot, then keep using the workstation normally'
          ],
          answer: [0, 1, 3]
        },
        { kind: 'dnd-match',
          text: 'Step 2: Match each remediation tool to its purpose.',
          items: [
            { id: 'av',     label: 'Reputable antivirus / anti-malware scan' },
            { id: 'extn',   label: 'Browser extension review' },
            { id: 'reset',  label: 'Reset browser settings' }
          ],
          buckets: [
            { id: 'b_remove',  label: 'Remove infected files' },
            { id: 'b_disable', label: 'Disable malicious add-ons' },
            { id: 'b_restore', label: 'Restore default home page / search engine' }
          ],
          correct: { av: 'b_remove', extn: 'b_disable', reset: 'b_restore' }
        },
        { kind: 'single',
          text: 'Step 3: After remediation, what should you do BEFORE handing the workstation back?',
          opts: [
            'Sell the old hard drive',
            'Re-enable System Restore and create a fresh restore point, then educate the user',
            'Disable the firewall to improve performance',
            'Remove all antivirus software'
          ],
          answer: 1
        }
      ],
      exp: 'CompTIA 7-step malware procedure: identify, quarantine, disable System Restore, remediate (scan, remove, reset), schedule scans/updates, re-enable System Restore, educate the user.'
    }
  ]);

  /* ----------------- Network+ (N10-009) ----------------------------------- */
  add('netplus', [
    // Multi-response
    { type: 'multi', selectCount: 2, domain: 'D1',
      q: 'Which TWO protocols use UDP as the transport layer by default?',
      opts: ['HTTP', 'DNS', 'SSH', 'DHCP', 'FTP'],
      answer: [1, 3],
      exp: 'DNS and DHCP are classic UDP services (fast, fire-and-forget). HTTP/SSH/FTP are TCP.'
    },
    { type: 'multi', selectCount: 2, domain: 'D4',
      q: 'Which TWO are characteristics of a properly configured guest Wi-Fi network?',
      opts: [
        'Isolated from the internal LAN',
        'Shares the corporate VLAN for simplicity',
        'Uses a captive portal or limited bandwidth',
        'Broadcasts the internal admin SSID',
        'Allows direct access to file servers'
      ],
      answer: [0, 2],
      exp: 'Guest networks should be segmented from internal resources (VLAN/subnet isolation) and often gated by a captive portal. The other choices erode the boundary.'
    },
    { type: 'multi', selectCount: 3, domain: 'D5',
      q: 'A user reports they cannot reach any website. Select THREE valid early troubleshooting commands.',
      opts: ['ping default gateway', 'ipconfig /all', 'nslookup a known domain', 'format C:', 'shutdown /r'],
      answer: [0, 1, 2],
      exp: 'Verify connectivity to gateway, check IP/DNS config, and confirm DNS resolution. Formatting/rebooting addresses neither the layer of the problem nor the diagnosis.'
    },
    { type: 'multi', selectCount: 2, domain: 'D2',
      q: 'Which TWO are advantages of VLANs?',
      opts: [
        'Logical segmentation without rewiring',
        'Improved broadcast domain isolation',
        'Eliminates the need for a router',
        'Removes the need for VLAN tagging on trunks',
        'Adds physical fiber capacity'
      ],
      answer: [0, 1],
      exp: 'VLANs split a switch into multiple logical broadcast domains, no rewiring needed. Inter-VLAN routing still requires a Layer-3 device, and trunk links carry 802.1Q tags.'
    },
    // Drag-and-drop
    { type: 'dnd-match', domain: 'D1',
      q: 'Match each OSI layer to its primary unit of data.',
      items: [
        { id: 'l2', label: 'Layer 2 (Data Link)' },
        { id: 'l3', label: 'Layer 3 (Network)' },
        { id: 'l4', label: 'Layer 4 (Transport)' },
        { id: 'l7', label: 'Layer 7 (Application)' }
      ],
      buckets: [
        { id: 'frame',   label: 'Frame' },
        { id: 'packet',  label: 'Packet' },
        { id: 'segment', label: 'Segment / Datagram' },
        { id: 'data',    label: 'Data / Message' }
      ],
      correct: { l2: 'frame', l3: 'packet', l4: 'segment', l7: 'data' },
      exp: 'Mnemonic for PDUs by layer: Data (L5-7) → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1).'
    },
    { type: 'dnd-match', domain: 'D1',
      q: 'Given the IP 192.168.10.130/26, match each network attribute to its value.',
      items: [
        { id: 'mask',   label: 'Subnet mask' },
        { id: 'netid',  label: 'Network ID' },
        { id: 'bcast',  label: 'Broadcast address' },
        { id: 'hosts',  label: 'Usable hosts per subnet' }
      ],
      buckets: [
        { id: 'm192',   label: '255.255.255.192' },
        { id: 'net128', label: '192.168.10.128' },
        { id: 'bc191',  label: '192.168.10.191' },
        { id: 'h62',    label: '62' }
      ],
      correct: { mask: 'm192', netid: 'net128', bcast: 'bc191', hosts: 'h62' },
      exp: '/26 = 26 network bits, 6 host bits. 2^6 = 64 addresses; minus network + broadcast = 62 usable. .130 lands in the .128–.191 subnet.'
    },
    // PBQ
    { type: 'pbq', domain: 'D5',
      q: 'PBQ — Connectivity outage: Multiple users on one floor cannot reach the internet. Other floors are fine.',
      steps: [
        { kind: 'single',
          text: 'Step 1: Which troubleshooting approach BEST fits an issue scoped to one floor?',
          opts: [
            'Top-down (Application → Physical)',
            'Bottom-up (Physical → Application)',
            'Divide and conquer (start at the suspected boundary — the floor switch)',
            'Random testing'
          ],
          answer: 2
        },
        { kind: 'dnd-match',
          text: 'Step 2: Match each tool to what it would tell you on this outage.',
          items: [
            { id: 'ping',    label: 'ping floor switch' },
            { id: 'tracert', label: 'tracert to 8.8.8.8' },
            { id: 'snmp',    label: 'Check SNMP/Syslog on floor switch' }
          ],
          buckets: [
            { id: 'reach', label: 'Is the floor switch reachable from a user?' },
            { id: 'path',  label: 'Where in the upstream path does traffic stop?' },
            { id: 'state', label: 'Has the switch logged interface or uplink errors?' }
          ],
          correct: { ping: 'reach', tracert: 'path', snmp: 'state' }
        },
        { kind: 'multi', selectCount: 2,
          text: 'Step 3: You discover the uplink from the floor switch to the core is down. Select TWO appropriate next actions.',
          opts: [
            'Reseat / replace the uplink fiber transceiver',
            'Verify the core-switch uplink port is admin-up and check for errors',
            'Disable the firewall',
            'Reset every user workstation on the floor',
            'Buy a new building'
          ],
          answer: [0, 1]
        }
      ],
      exp: 'Scope tells you where to start: a single-floor outage points at the floor uplink/switch. Verify reachability, trace the upstream path, and inspect the suspected device for interface errors.'
    }
  ]);

  /* =========================================================================
     SECOND BATCH — "final-exam grade" content additions (2026-05-28).
     Authored to bring Tech+ D1 and A+ Core 1 D4/D5 closer to the official
     blueprint weighting so the portal can stand in as a graded final.
     Scenario-style stems, BEST/FIRST/MOST qualifiers, troubleshooting
     methodology.
     ========================================================================= */

  /* ----------------- Tech+ — IT Concepts & Terminology (D1) ---------------- */
  add('techplus', [
    { domain: 'D1', q: 'A teacher tells students that one byte equals 8 bits. Which of the following BEST explains why this matters for storage units?',
      opts: ['Bytes and bits are interchangeable terms', 'A 1 GB file ≈ 8 Gb when measured in bits — half-speed bandwidth math', 'Bytes are larger than bits, so 1 GB ≈ 8 Gb (helpful when comparing storage to network speeds in Mbps)', 'Bytes only apply to RAM, not storage'],
      answer: 2, exp: 'Storage is typically measured in bytes (uppercase B); network speed in bits (lowercase b). 1 byte = 8 bits, so a 100 Mbps connection moves ~12.5 MB/s. Confusing the two is a common student mistake.' },
    { domain: 'D1', q: 'Which of the following is the FIRST step in a typical troubleshooting model?',
      opts: ['Establish a theory of probable cause', 'Identify the problem', 'Test the theory to determine the cause', 'Document findings, actions, and outcomes'],
      answer: 1, exp: 'CompTIA troubleshooting model order: 1) identify the problem, 2) establish a theory, 3) test the theory, 4) establish a plan of action, 5) verify functionality, 6) document. Jumping ahead skips information you may need.' },
    { domain: 'D1', q: 'A user describes a screen issue as "the bottom right of the monitor is dim." What kind of information is this BEST classified as?',
      opts: ['A theory of probable cause', 'A documented finding', 'A symptom (observation) used to identify the problem', 'A plan of action'],
      answer: 2, exp: 'User-reported observations are symptoms used in step 1 of troubleshooting (identify the problem). A theory comes later, after gathering enough symptoms.' },
    { domain: 'D1', q: 'Which numerical comparison is correct?',
      opts: ['1 TB > 1,000 GB > 1,000,000 MB', '1 TB ≈ 1,000 GB ≈ 1,000,000 MB', '1 GB > 1 TB > 1 MB', '1 MB > 1 GB > 1 TB'],
      answer: 1, exp: 'In the decimal (SI) system used by most consumer storage: 1 TB ≈ 1,000 GB ≈ 1,000,000 MB ≈ 1,000,000,000 KB. The relationships are approximations because the binary (IEC) system uses 1024 instead of 1000.' },
    { domain: 'D1', q: 'Which of the following BEST describes the difference between data and information?',
      opts: ['Data and information mean the same thing', 'Data is processed into information when it is organized and given context for a purpose', 'Information is always numeric; data is always text', 'Information is stored on disk; data is only in RAM'],
      answer: 1, exp: 'Raw data (e.g., a list of temperatures) becomes information when organized and put in context (e.g., "average temperature for July rose 2°"). The distinction underlies every business intelligence question.' },
    { domain: 'D1', q: 'Which unit is the SMALLEST?',
      opts: ['1 megabyte (MB)', '1 kilobyte (KB)', '1 gigabyte (GB)', '1 byte (B)'],
      answer: 3, exp: 'Order smallest → largest: byte (B) → kilobyte (KB) → megabyte (MB) → gigabyte (GB) → terabyte (TB) → petabyte (PB).' },
    { domain: 'D1', q: 'A student asks why hex is "easier" than binary for humans even though both are just numbers. Which is the BEST explanation?',
      opts: ['Hex uses fewer digits to represent the same value because one hex digit replaces four binary bits', 'Hex is faster for the CPU to process', 'Hex always uses letters; binary always uses numbers', 'Hex is required for IP addresses'],
      answer: 0, exp: '4 binary bits = 1 hex digit. A 24-bit color value like 11111111 10000000 00000000 takes only 6 hex digits (FF8000). MAC addresses, color codes, and memory dumps all lean on this compactness.' },
    { domain: 'D1', q: 'Which of the following is MOST clearly an example of "information," not just "data"?',
      opts: ['37, 42, 51, 29', 'A spreadsheet header row with no data', 'A monthly sales chart that shows revenue trending up 12% year-over-year', 'A randomly generated string of letters'],
      answer: 2, exp: 'Information is data put into context that supports a decision or insight. The other choices are raw values, headers without rows, or noise — they have no decision-value until organized.' }
  ]);

  /* ----------------- A+ Core 1 — Virtualization & Cloud (D4) --------------- */
  add('aplus1', [
    { domain: 'D4', q: 'A small business wants to spin up new development environments quickly without buying physical hardware. Which cloud service model is BEST suited?',
      opts: ['SaaS', 'PaaS', 'IaaS', 'On-premises'],
      answer: 2, exp: 'IaaS (Infrastructure as a Service) provides VMs, storage, and networking on demand. PaaS provides a managed application platform; SaaS provides finished applications. On-premises requires owning hardware.' },
    { domain: 'D4', q: 'Which of the following is MOST characteristic of a Type 1 hypervisor?',
      opts: ['Runs as an application on top of a host operating system', 'Installs directly on the hardware (bare metal) with no host OS', 'Only supports a single guest VM', 'Cannot run Windows guests'],
      answer: 1, exp: 'Type 1 (bare-metal) hypervisors run directly on the hardware — ESXi, Hyper-V, Xen. Type 2 (hosted) hypervisors run on top of a host OS — VirtualBox, VMware Workstation. Type 1 is preferred for production due to lower overhead.' },
    { domain: 'D4', q: 'A technician needs to test a software change but wants to be able to revert quickly if something breaks. Which virtualization feature BEST supports this?',
      opts: ['Snapshot', 'Live migration', 'Resource pool', 'Templates'],
      answer: 0, exp: 'A snapshot captures the VM state and can be rolled back in seconds. Live migration moves a running VM between hosts; templates clone fresh VMs; resource pools allocate CPU/RAM — none provide rollback.' },
    { domain: 'D4', q: 'Which cloud characteristic BEST describes a service that automatically scales up resources during a traffic spike and back down afterward?',
      opts: ['Measured service', 'Resource pooling', 'Rapid elasticity', 'Broad network access'],
      answer: 2, exp: 'Rapid elasticity = resources scale up and down automatically with demand. Measured service = pay for what you use. Resource pooling = multi-tenant infrastructure. Broad network access = available over standard network.' },
    { domain: 'D4', q: 'A company hosts its email in Microsoft 365 and its accounting database on an in-house server. Which cloud deployment model BEST describes this combined setup?',
      opts: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Community cloud'],
      answer: 2, exp: 'Hybrid combines public (M365) and private/on-premises (in-house server) resources. Companies use this pattern to keep sensitive data in-house while using public cloud for common services.' },
    { domain: 'D4', q: 'A virtualization administrator notices a VM running poorly under heavy load. Inspecting the host shows the host CPU is at 95% across all VMs. Which is the MOST likely cause?',
      opts: ['Missing antivirus on the guest', 'CPU resource contention across guests on a single host', 'The guest OS is outdated', 'The hypervisor needs reactivation'],
      answer: 1, exp: 'When the host CPU is saturated, every guest contends for cycles, so individual VMs slow down. Solutions include adding hosts, redistributing VMs, or assigning CPU reservations/limits.' }
  ]);

  /* ----------------- A+ Core 1 — Hardware & Network Troubleshooting (D5) --- */
  add('aplus1', [
    { domain: 'D5', q: 'A user reports that their workstation makes a clicking noise from the hard drive and is much slower to open files than yesterday. Which is the MOST likely cause?',
      opts: ['Failing mechanical hard drive', 'Out-of-date BIOS', 'Too many browser tabs', 'A malfunctioning monitor'],
      answer: 0, exp: 'Audible clicking + degraded read performance is the classic mechanical HDD failure signature (the "click of death"). Back up immediately and replace the drive.' },
    { domain: 'D5', q: 'A user\'s laptop display flickers intermittently. The flicker stops if the lid is held at a specific angle. Which is the MOST likely cause?',
      opts: ['Failed RAM', 'Damaged LCD inverter or display cable in the hinge', 'Outdated GPU driver', 'Loose CPU socket'],
      answer: 1, exp: 'Angle-dependent flicker points at the display cable that runs through the hinge — physical wear is a common laptop failure. The fix is replacement of the cable assembly.' },
    { domain: 'D5', q: 'After replacing the RAM in a desktop, the system POSTs but only recognizes half of the installed memory. Which is the FIRST thing the technician should check?',
      opts: ['Reseat the modules in the matched dual-channel slots per the motherboard manual', 'Replace the CPU', 'Update Windows', 'Reinstall the GPU driver'],
      answer: 0, exp: 'Mis-seated modules or wrong slot pairing is the most common cause of memory not fully recognized after install. Check the motherboard manual for the correct slot order (often A2/B2 first for two-stick installs).' },
    { domain: 'D5', q: 'A printer is producing pages with vertical white streaks running top-to-bottom. Which printer component is the MOST likely cause?',
      opts: ['Clogged inkjet print head or empty/dirty toner area on a laser drum', 'Loose paper tray', 'Wrong driver version', 'Faulty USB cable'],
      answer: 0, exp: 'Vertical streaks track with the print head/drum motion. On inkjets: clogged nozzles → run head cleaning. On laser: dirty/uneven toner on the drum → replace toner cartridge.' },
    { domain: 'D5', q: 'A user reports the desktop spontaneously reboots under load — gaming or rendering — but is stable at idle. Which is the MOST likely cause?',
      opts: ['Failing power supply unable to deliver peak wattage, or thermal shutdown from a clogged heatsink', 'Bad keyboard', 'Outdated browser', 'Loose monitor cable'],
      answer: 0, exp: 'Load-triggered reboots are classic for under-rated/failing PSU or overheating CPU/GPU. Verify PSU wattage matches the system and clean heatsinks/fans. Monitor temps with HWMonitor or BIOS.' },
    { domain: 'D5', q: 'A technician sees three short beeps at POST on a workstation. Which is the MOST likely meaning (BIOS-dependent)?',
      opts: ['Successful POST', 'Memory error — bad or unseated RAM', 'CPU overheating', 'Network cable unplugged'],
      answer: 1, exp: 'Beep code meanings vary by BIOS vendor, but a repeating pattern of short beeps at POST commonly indicates memory failure. Reseat the modules first, then test sticks individually.' },
    { domain: 'D5', q: 'A user reports their wired desktop says "no internet" but the link light on the NIC is solid. Which step BEST verifies whether the issue is past the local switch?',
      opts: ['Restart the user\'s monitor', 'Ping the default gateway, then ping a known external IP like 8.8.8.8', 'Reinstall Windows', 'Replace the patch cable first'],
      answer: 1, exp: 'Ping gateway → if it succeeds, local LAN is fine, problem is upstream. Then ping 8.8.8.8 → if it succeeds but DNS names fail, the issue is DNS. Methodical layer-by-layer testing isolates the fault.' },
    { domain: 'D5', q: 'A laptop will not power on. The charger LED is lit when plugged in but the laptop shows no response. Which is the MOST appropriate FIRST step?',
      opts: ['Replace the motherboard', 'Try a different known-good charger that matches the laptop\'s voltage/amperage and check the DC jack for damage', 'Reinstall the OS', 'Open the case and replace the SSD'],
      answer: 1, exp: 'Bad charger or damaged DC jack is far more common than motherboard failure. Always test with a known-good charger before deeper hardware diagnosis.' },
    { domain: 'D5', q: 'A workstation BSODs intermittently with different stop codes each time and no obvious trigger. Which is the MOST useful first diagnostic?',
      opts: ['Reinstall Windows', 'Run a Windows Memory Diagnostic or MemTest86 to check RAM, and check Event Viewer for hardware errors', 'Reset BIOS to defaults', 'Replace the GPU'],
      answer: 1, exp: 'Random BSOD stop codes very often point at flaky RAM. Memory diagnostics test each module under stress. Event Viewer + WhoCrashed analysis of minidumps can also reveal patterns.' },
    { domain: 'D5', q: 'A user reports an HDMI-connected monitor as "no display" — the workstation is on, the user can hear Windows sounds. The display works on another PC. Which is the MOST likely cause?',
      opts: ['CPU has failed', 'HDMI cable seated incorrectly, wrong input selected on the monitor, or graphics output set to the wrong port', 'OS needs reinstall', 'Power supply is dead'],
      answer: 1, exp: 'Windows sounds = the PC is running fine. Display path is the issue: cable, input source, or wrong GPU port selected (especially when a discrete GPU is installed alongside integrated graphics).' },
    { domain: 'D5', q: 'A printer randomly stops mid-job and the queue shows a stuck document. Other users can\'t print until it\'s cleared. Which is the BEST FIRST action?',
      opts: ['Replace the printer', 'Cancel the stuck document in the print queue and restart the Print Spooler service', 'Reinstall Windows', 'Update the BIOS'],
      answer: 1, exp: 'Stuck jobs are usually a corrupted spool file. Cancel the document, then restart the Print Spooler service (services.msc → Print Spooler → Restart). This clears the queue without rebooting.' },
    { domain: 'D5', q: 'A user reports their Wi-Fi works near the access point but drops at the other end of the building. Which is the MOST appropriate FIRST step?',
      opts: ['Replace the access point', 'Survey signal strength in the affected area and consider adding a second AP or repositioning the existing one', 'Switch the user to a wired connection', 'Update Windows'],
      answer: 1, exp: 'Distance-related dropouts mean weak signal coverage. A site survey identifies dead zones; the fix is usually a second AP, mesh node, or relocating the AP centrally — not replacement.' },
    { domain: 'D5', q: 'A laser printer is leaving smeared toner that wipes off easily with a finger. Which printer component is the MOST likely cause?',
      opts: ['Empty paper tray', 'Failing fuser unit — heat is not bonding toner to paper', 'Wrong driver', 'Bad network cable'],
      answer: 1, exp: 'The fuser melts toner onto the page. If it fails or runs cold, toner stays on the surface and smears. This is one of the most common laser printer repair calls.' },
    { domain: 'D5', q: 'A SOHO router is reachable from inside the LAN but external users can no longer connect to a hosted service. Which BEST describes the FIRST place to look?',
      opts: ['Check the user workstation for malware', 'Verify port-forwarding rules and the ISP-assigned public IP have not changed', 'Replace the modem', 'Reinstall Windows on every internal device'],
      answer: 1, exp: 'External reachability depends on port forwarding pointing the correct external port to the internal service host, and on the public IP not having changed (common with dynamic IPs). DDNS solves the IP drift.' },
    { domain: 'D5', q: 'A workstation\'s CPU temperature climbs above 95 °C under modest load, and the fans spin loudly. Which is the MOST likely cause?',
      opts: ['Dried-out thermal paste between CPU and heatsink, or a clogged heatsink/fan from dust', 'Outdated network driver', 'Wrong monitor resolution', 'Bad keyboard'],
      answer: 0, exp: 'High CPU temps + loud fans = thermal transfer is failing. Re-apply thermal paste and clean dust from heatsink/fans. Aged systems often need both.' },
    { domain: 'D5', q: 'A user complains a USB flash drive shows up in Device Manager but does NOT appear in File Explorer. Which is the MOST likely cause?',
      opts: ['CPU is faulty', 'The drive has no drive letter assigned or its file system is unrecognized (e.g., a Mac-formatted drive on Windows)', 'Wi-Fi is disabled', 'Audio driver is missing'],
      answer: 1, exp: 'Device Manager detection means the hardware is recognized; missing in File Explorer is usually a drive-letter or filesystem issue. Use Disk Management to assign a letter or reformat if appropriate.' },
    { domain: 'D5', q: 'Two users on the same VLAN can\'t reach a particular file server, but other servers work. Which is the MOST likely cause?',
      opts: ['DNS for that one server is broken or the server itself is offline', 'The entire VLAN is misconfigured', 'Both user workstations need new GPUs', 'Windows needs reinstall on both PCs'],
      answer: 0, exp: 'Scope tells you where to look. Other servers reachable = VLAN/path are fine. Problem is specific to that one server — start with its DNS record, then ping/RDP to verify it is online.' },
    { domain: 'D5', q: 'A user reports a slow Wi-Fi connection that only happens in the afternoon. Which is the MOST likely cause?',
      opts: ['Bad Ethernet cable', 'Channel interference from neighboring APs as more devices wake up — congestion on the 2.4 GHz band', 'Failing power supply', 'Mouse driver issue'],
      answer: 1, exp: 'Time-of-day slowdowns suggest contention. 2.4 GHz has only 3 non-overlapping channels and crowds quickly. Switch APs/clients to 5 GHz or set the AP to a less-congested channel.' },
    { domain: 'D5', q: 'A user calls saying their monitor displays only large, fuzzy text after the OS booted into a "safe" mode for the first time. Which is the MOST likely cause?',
      opts: ['Failed monitor', 'Safe Mode is using a generic/low-resolution display driver — normal behavior until the proper driver loads', 'CPU has failed', 'Wrong DDR generation'],
      answer: 1, exp: 'Safe Mode loads only essential drivers, including a fallback generic display driver at low resolution. Boot normally to restore the proper driver. If safe-mode resolution persists on normal boot, the GPU driver is failing.' },
    { domain: 'D5', q: 'A help-desk technician finishes a fix on a user\'s machine. Which step should they perform NEXT per the troubleshooting model?',
      opts: ['Move to the next ticket immediately', 'Verify full system functionality with the user and document the findings and resolution', 'Reboot the entire office', 'Reset the user\'s password as a precaution'],
      answer: 1, exp: 'Verify functionality is the second-to-last step; documentation is the final step. Skipping verification means the fix might not work end-to-end, and skipping documentation hurts the next technician who sees the issue.' },
    { domain: 'D5', q: 'A RAID 5 array shows a "degraded" status in the controller utility. Which BEST describes what is happening and the recommended action?',
      opts: ['Data is lost — restore from backup immediately', 'One drive has failed; array is still operational but at reduced redundancy. Replace the failed drive and let the array rebuild as soon as possible', 'The RAID controller has failed and must be replaced first', 'Two drives have failed simultaneously'],
      answer: 1, exp: 'RAID 5 survives a single drive failure and continues operating "degraded" off parity. A SECOND drive failure during rebuild loses all data, so replacing the failed drive promptly is critical.' }
  ]);

  /* ----------------- A+ Core 1 — exhibit-bearing question ------------------ */
  add('aplus1', [
    { domain: 'D2',
      q: 'Refer to the exhibit. Which TWO hosts share a single broadcast domain by default?',
      type: 'multi',
      selectCount: 2,
      image: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260" style="width:100%;max-width:600px;display:block">'
        + '<rect width="600" height="260" fill="#1a1d2e" rx="8"/>'
        // Router in the middle
        + '<rect x="260" y="100" width="80" height="44" rx="6" fill="#252840" stroke="#f1c40f" stroke-width="2"/>'
        + '<text x="300" y="127" fill="#f1c40f" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" text-anchor="middle">ROUTER</text>'
        // Switch A on the left
        + '<rect x="80" y="100" width="80" height="44" rx="6" fill="#252840" stroke="#3498db" stroke-width="2"/>'
        + '<text x="120" y="127" fill="#3498db" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" text-anchor="middle">SWITCH A</text>'
        // Switch B on the right
        + '<rect x="440" y="100" width="80" height="44" rx="6" fill="#252840" stroke="#3498db" stroke-width="2"/>'
        + '<text x="480" y="127" fill="#3498db" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" text-anchor="middle">SWITCH B</text>'
        // Lines from router to switches
        + '<line x1="160" y1="122" x2="260" y2="122" stroke="#8892b0" stroke-width="2"/>'
        + '<line x1="340" y1="122" x2="440" y2="122" stroke="#8892b0" stroke-width="2"/>'
        // Hosts on Switch A
        + '<rect x="40" y="200" width="60" height="34" rx="5" fill="#252840" stroke="#2ecc71" stroke-width="2"/>'
        + '<text x="70" y="222" fill="#2ecc71" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" text-anchor="middle">PC 1</text>'
        + '<rect x="140" y="200" width="60" height="34" rx="5" fill="#252840" stroke="#2ecc71" stroke-width="2"/>'
        + '<text x="170" y="222" fill="#2ecc71" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" text-anchor="middle">PC 2</text>'
        + '<line x1="70" y1="200" x2="100" y2="144" stroke="#8892b0" stroke-width="2"/>'
        + '<line x1="170" y1="200" x2="140" y2="144" stroke="#8892b0" stroke-width="2"/>'
        // Hosts on Switch B
        + '<rect x="400" y="200" width="60" height="34" rx="5" fill="#252840" stroke="#e67e22" stroke-width="2"/>'
        + '<text x="430" y="222" fill="#e67e22" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" text-anchor="middle">PC 3</text>'
        + '<rect x="500" y="200" width="60" height="34" rx="5" fill="#252840" stroke="#e67e22" stroke-width="2"/>'
        + '<text x="530" y="222" fill="#e67e22" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" text-anchor="middle">PC 4</text>'
        + '<line x1="430" y1="200" x2="460" y2="144" stroke="#8892b0" stroke-width="2"/>'
        + '<line x1="530" y1="200" x2="500" y2="144" stroke="#8892b0" stroke-width="2"/>'
        // Note text
        + '<text x="300" y="36" fill="#8892b0" font-family="Segoe UI, sans-serif" font-size="13" text-anchor="middle">All switches and hosts are in their default VLAN — no VLAN tagging configured.</text>'
        + '<text x="300" y="56" fill="#8892b0" font-family="Segoe UI, sans-serif" font-size="13" text-anchor="middle">The router separates the two switch networks into different subnets.</text>'
        + '</svg>',
      opts: ['PC 1 and PC 2', 'PC 1 and PC 3', 'PC 2 and PC 4', 'PC 3 and PC 4', 'All four PCs'],
      answer: [0, 3],
      exp: 'A broadcast domain is bounded by routers, not switches. Switch A is one broadcast domain (PC 1, PC 2); Switch B is another (PC 3, PC 4). The router separates them — broadcasts on Switch A never reach Switch B (and vice versa).'
    }
  ]);

  /* ----------------- A+ Core 1 — additional PBQs --------------------------- */
  add('aplus1', [
    { type: 'pbq', domain: 'D5',
      q: 'PBQ — Network connectivity: A user on a wired workstation reports "the internet doesn\'t work." The PC is on; other people on the same floor are fine.',
      steps: [
        { kind: 'single',
          text: 'Step 1: What should you confirm FIRST before deeper diagnosis?',
          opts: [
            'Replace the user\'s NIC',
            'Verify the link light is on at the NIC and the wall jack, and confirm the patch cable is fully seated at both ends',
            'Reinstall Windows',
            'Reboot every router in the building'
          ],
          answer: 1
        },
        { kind: 'dnd-match',
          text: 'Step 2: Link looks healthy. Match each command to what it confirms.',
          items: [
            { id: 'ipconfig', label: 'ipconfig /all' },
            { id: 'ping_gw',  label: 'ping <default gateway>' },
            { id: 'ping_ip',  label: 'ping 8.8.8.8' },
            { id: 'nslookup', label: 'nslookup example.com' }
          ],
          buckets: [
            { id: 'b_addr',  label: 'Did the workstation get a valid IP/DNS from DHCP?' },
            { id: 'b_lan',   label: 'Is the local switch/router reachable?' },
            { id: 'b_wan',   label: 'Is the internet reachable by IP?' },
            { id: 'b_dns',   label: 'Is DNS name resolution working?' }
          ],
          correct: { ipconfig: 'b_addr', ping_gw: 'b_lan', ping_ip: 'b_wan', nslookup: 'b_dns' }
        },
        { kind: 'multi', selectCount: 2,
          text: 'Step 3: You can ping 8.8.8.8 but nslookup fails. Select TWO things to check NEXT.',
          opts: [
            'The DNS server IPs in ipconfig /all',
            'The keyboard',
            'Whether changing DNS to a public resolver (e.g., 8.8.8.8) resolves names',
            'The monitor brightness',
            'Whether the printer is on'
          ],
          answer: [0, 2]
        }
      ],
      exp: 'Connectivity by IP but not by name = DNS problem. Confirm the assigned DNS servers (ipconfig /all), then test name resolution against a known-good public resolver. If the public resolver works, the configured DNS server is the issue.'
    },
    { type: 'pbq', domain: 'D3',
      q: 'PBQ — Storage selection: A small business is configuring a new file server for ~10 users. They want continued operation if a single disk fails and reasonable capacity efficiency.',
      steps: [
        { kind: 'single',
          text: 'Step 1: Which RAID level BEST fits "fault tolerance for one drive failure with reasonable capacity efficiency"?',
          opts: ['RAID 0 (striping, no parity)', 'RAID 1 (mirroring)', 'RAID 5 (striping with parity)', 'JBOD (no RAID)'],
          answer: 2
        },
        { kind: 'dnd-match',
          text: 'Step 2: Match each RAID level to its primary trade-off.',
          items: [
            { id: 'r0',  label: 'RAID 0' },
            { id: 'r1',  label: 'RAID 1' },
            { id: 'r5',  label: 'RAID 5' },
            { id: 'r10', label: 'RAID 10' }
          ],
          buckets: [
            { id: 'b_speed',     label: 'Fastest, but no redundancy' },
            { id: 'b_mirror',    label: '100% redundancy, 50% capacity' },
            { id: 'b_parity',    label: 'One-drive fault tolerance, ~(n-1)/n capacity' },
            { id: 'b_combo',     label: 'Mirroring + striping — fast + redundant, 50% capacity' }
          ],
          correct: { r0: 'b_speed', r1: 'b_mirror', r5: 'b_parity', r10: 'b_combo' }
        },
        { kind: 'multi', selectCount: 2,
          text: 'Step 3: Select TWO best practices when building a RAID 5 array for production.',
          opts: [
            'Use disks of the same size and ideally the same model',
            'Skip the hot spare to save money',
            'Keep an off-RAID backup — RAID is not a backup',
            'Use disks of mixed sizes to save money',
            'Disable SMART monitoring'
          ],
          answer: [0, 2]
        }
      ],
      exp: 'RAID 5 gives single-disk fault tolerance with ~(n-1)/n usable capacity. Always pair RAID with proper backups — a second drive failure during rebuild or a controller failure can still take down the array.'
    }
  ]);

})();
