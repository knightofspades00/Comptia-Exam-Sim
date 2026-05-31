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

  /* =========================================================================
     THIRD BATCH — scenario-grade difficulty (2026-05-31)
     Authored to raise the difficulty floor of Tech+ and A+ Core 1. Every
     question here uses a scenario stem ("A user reports...", "A technician
     finds...", "A small business needs..."), BEST/MOST/FIRST qualifiers,
     and plausibly-correct distractors. Mapped to under-weighted domains
     and to the troubleshooting / decision skills the real CompTIA exams
     reward over straight recall.
     ========================================================================= */

  /* ----------------- Tech+ — harder scenario questions --------------------- */
  add('techplus', [
    /* D1 — IT Concepts & Terminology */
    { domain: 'D1', q: 'A help-desk ticket reads: "User\'s laptop is intermittently slow." Which of the following BEST explains why intermittent issues are the MOST difficult to troubleshoot?',
      opts: ['They are easier to ignore', 'They cannot be reproduced on demand, so they are harder to diagnose and verify a fix worked', 'They never affect more than one user', 'They are always a hardware problem'],
      answer: 1, exp: 'Intermittent problems cannot be reproduced reliably. Identification, theory testing, and verification all rely on being able to make the problem happen. When you cannot, technicians must instrument, log, or wait — slowing the entire troubleshooting model.' },
    { domain: 'D1', q: 'A teacher hands a technician a sticky note that says "Computer won\'t print." Which is the BEST next action?',
      opts: ['Replace the printer', 'Ask the user clarifying questions: which printer, what application, what error message, when it started', 'Reinstall Windows', 'Disable the firewall'],
      answer: 1, exp: 'Identify-the-problem (step 1 of CompTIA\'s troubleshooting model) requires gathering specifics. A vague symptom + acting on it usually leads to the wrong fix. Clarifying questions narrow the scope before any change is made.' },
    { domain: 'D1', q: 'A school IT director must explain to staff why "data" alone is not as useful as "information." Which scenario BEST illustrates the difference?',
      opts: ['A list of student IDs vs. a chart showing which classes have the most absences', 'Numbers stored on disk vs. numbers stored in RAM', 'A file with a .txt extension vs. a .pdf extension', 'A laptop running Windows vs. a laptop running macOS'],
      answer: 0, exp: 'Raw IDs are data. Aggregating and contextualizing them ("which classes have the most absences") turns them into information that supports a decision. The other contrasts are about location, format, or platform — not data-vs-information.' },
    { domain: 'D1', q: 'Two laptops are advertised side by side: Laptop A has "16 GB RAM, 512 GB SSD, 13th-gen CPU." Laptop B has "8 GB RAM, 1 TB HDD, 13th-gen CPU." For a student who edits video, which is the BETTER choice and WHY?',
      opts: ['Laptop A — more RAM and an SSD speed up video editing more than extra HDD capacity', 'Laptop B — more storage is always better', 'Either — they have the same CPU, so they perform identically', 'Laptop B — HDDs are faster than SSDs'],
      answer: 0, exp: 'Video editing is RAM- and disk-speed-sensitive. 16 GB vs 8 GB matters when handling large frames; an SSD reads/writes orders of magnitude faster than an HDD for scratch files. Same CPU generation does not equal same overall performance.' },

    /* D2 — Infrastructure */
    { domain: 'D2', q: 'A small business has a 100 Mbps internet connection. They want to back up 50 GB of new files to cloud storage between 6 PM and 11 PM (5 hours, dedicated). Will the bandwidth support this if no other traffic competes?',
      opts: ['No — 100 Mbps means 100 megabytes per second, and 50 GB would take 500 seconds', 'Yes — 100 Mbps ≈ 12.5 MB/s; 50 GB ≈ 51,200 MB; that is ~4,096 seconds ≈ 68 minutes. Well within 5 hours.', 'No — backups always saturate the link', 'Cannot be determined without knowing the storage type'],
      answer: 1, exp: '100 Mbps ÷ 8 bits/byte = 12.5 MB/s. 50 GB ≈ 51,200 MB. 51,200 ÷ 12.5 ≈ 4,096 s ≈ 68 min. The trap is confusing Mbps (megabits) with MB/s (megabytes) — a factor of 8.' },
    { domain: 'D2', q: 'A user complains their Wi-Fi works fine near the router but drops to one bar in the back office. They are 60 feet away and on the 5 GHz band. Which of the following BEST explains the symptom?',
      opts: ['5 GHz has a shorter effective range than 2.4 GHz, especially through walls', '5 GHz is slower than 2.4 GHz at long distances', 'The router needs more RAM', 'The laptop\'s NIC is failing'],
      answer: 0, exp: '5 GHz offers higher throughput but shorter range and worse wall penetration than 2.4 GHz. At 60 ft through walls, signal attenuates significantly. The fix is an additional access point, a mesh node, or letting the laptop drop to 2.4 GHz where coverage is better.' },
    { domain: 'D2', q: 'A user needs to copy 200 GB of video files from a laptop to an external drive in the shortest time. Which port BEST supports this?',
      opts: ['USB 2.0 (480 Mbps theoretical, ~30 MB/s in practice)', 'USB 3.2 Gen 2 (10 Gbps theoretical, ~900 MB/s in practice)', 'Ethernet 100BASE-TX (100 Mbps)', '3.5 mm audio jack'],
      answer: 1, exp: 'USB 3.2 Gen 2 is roughly 30× faster than USB 2.0 in practice. Ethernet at 100 Mbps is far slower. The audio jack does not transfer data. Always match the slowest device in the chain — 3.2 Gen 2 cable + 3.2 Gen 2 drive.' },
    { domain: 'D2', q: 'A small office runs a printer, two desktops, and a guest Wi-Fi. They want to keep guest devices from reaching the printer or desktops. Which is the MOST appropriate approach?',
      opts: ['Put the guest Wi-Fi on a separate isolated VLAN or guest SSID with client isolation enabled', 'Unplug the printer when guests are present', 'Use a stronger Wi-Fi password', 'Hide the SSID'],
      answer: 0, exp: 'Network segmentation (separate VLAN/SSID with isolation) prevents guest clients from reaching internal resources. Hiding an SSID or strengthening the password does not segment traffic; unplugging the printer is impractical.' },
    { domain: 'D2', q: 'A user is choosing between a public cloud storage service and a private on-premises NAS. They need access from multiple locations, automatic versioning, and minimal upfront cost. Which BEST fits these requirements?',
      opts: ['Public cloud storage — multi-location access and managed versioning with subscription cost', 'On-premises NAS — minimal upfront cost is its main advantage', 'On-premises NAS — automatic versioning is only available locally', 'Public cloud — has no recurring cost'],
      answer: 0, exp: 'Public cloud matches the criteria: web access from anywhere, managed versioning, no large hardware purchase. On-prem NAS has higher upfront cost and reaching it from outside requires additional configuration (VPN/port-forwarding).' },
    { domain: 'D2', q: 'A user reports the internet "is slow today" but other workstations on the same LAN work fine. Which is the MOST appropriate FIRST step?',
      opts: ['Reboot the modem and the entire office', 'Run a speed test on the affected workstation, then compare to a working one to isolate whether the issue is the workstation, the LAN, or the WAN', 'Replace the ISP connection', 'Reinstall Windows'],
      answer: 1, exp: 'A single-workstation slowdown when others are fine isolates the problem AWAY from the WAN. Speed-test comparison narrows the scope. Reboots and reinstalls are too aggressive for a localized issue.' },
    { domain: 'D2', q: 'A school district uses cellular hotspots as a backup internet connection at sites where wired internet is unreliable. The hotspot supports about 25 users at a time. Which trade-off is MOST important to communicate to staff?',
      opts: ['Cellular hotspots eliminate the need for Wi-Fi entirely', 'Cellular hotspots typically have data caps and shared bandwidth, so streaming video may degrade for everyone', 'Cellular hotspots cannot be used for email', 'Cellular hotspots require an Ethernet cable to every device'],
      answer: 1, exp: 'Cellular plans usually impose data caps and prioritize light usage. Twenty-five users on one hotspot share the cellular link, so high-bandwidth streaming will compete and slow the connection for everyone. Staff should be told to defer streaming when on a hotspot.' },
    { domain: 'D2', q: 'A user wants to connect a workstation to a wired network 200 feet (60 m) away through a noisy industrial environment. Cat 6 copper is rated for 100 m, so it would technically reach. Which is the BETTER medium and WHY?',
      opts: ['Cat 6 copper — it costs less and 60 m is within spec', 'Fiber-optic — it is immune to electromagnetic interference from machinery, which copper is not', 'Wi-Fi — wireless avoids all cabling', 'USB extension — easier to install'],
      answer: 1, exp: 'In electrically noisy environments (motors, welders, large transformers), copper picks up interference that degrades the signal. Fiber is immune to EMI because it uses light. The 100 m rating is for benign environments; industrial noise often pushes you to fiber regardless of distance.' },

    /* D3 — Applications & Software */
    { domain: 'D3', q: 'A teacher reports that one specific application crashes every time they open it, but other apps work fine. The application opened normally yesterday. Which is the MOST appropriate FIRST step?',
      opts: ['Reinstall Windows', 'Check for updates to the application; if none, repair or reinstall just that application', 'Replace the hard drive', 'Disable the firewall'],
      answer: 1, exp: 'A single failing application + other apps fine = scope is one app, not the system. Step 1: update or repair that app. Reinstalling Windows or swapping hardware is far too aggressive when the symptom is localized.' },
    { domain: 'D3', q: 'A small business is choosing between Microsoft 365 (subscription) and a one-time purchase of Office 2021. They want to use the latest versions automatically and need installs on 50 devices. Which BEST fits these requirements?',
      opts: ['Office 2021 — saves money long-term', 'Microsoft 365 — subscription includes automatic version updates and per-seat licensing for multiple devices', 'Office 2021 — automatic updates are included with a one-time purchase', 'Either — there is no functional difference'],
      answer: 1, exp: 'Microsoft 365 subscription includes the latest feature updates and licenses per user (commonly 5 devices each). Office 2021 perpetual licenses cover one device each and do not receive feature updates — only security patches.' },
    { domain: 'D3', q: 'A user wants to send a document to a coworker who runs a different OS, and the formatting (fonts, margins, embedded images) must look exactly the same. Which file format is the BEST choice?',
      opts: ['.docx (Microsoft Word)', '.pdf (Portable Document Format)', '.txt (plain text)', '.html (web page)'],
      answer: 1, exp: 'PDF preserves layout, fonts (embedded), and visual fidelity across operating systems and devices. .docx may render differently if the receiver lacks the same fonts. .txt strips all formatting. .html may reflow.' },
    { domain: 'D3', q: 'A user reports their browser keeps redirecting them to ads and a new toolbar appeared. Antivirus is up to date. Which BEST explains how the issue likely occurred and what to address FIRST?',
      opts: ['The CPU is failing — replace it', 'A malicious or unwanted browser extension was installed, often bundled with other software. Remove unknown extensions and run a full anti-malware scan.', 'The OS needs reinstalling immediately', 'The internet connection is too slow'],
      answer: 1, exp: 'Browser hijack symptoms (redirects, injected toolbars) are usually caused by browser-level adware/PUPs that slip past traditional antivirus. The fastest fix is to remove unknown extensions, reset the browser, and scan with anti-malware (Malwarebytes-style).' },
    { domain: 'D3', q: 'A nonprofit needs document editing, spreadsheets, and presentations for 30 volunteers at no licensing cost. Which is the MOST appropriate choice?',
      opts: ['Pirated copies of Microsoft Office', 'A reputable open-source suite such as LibreOffice', 'Notepad and the calculator', 'Buying 30 retail copies of Office'],
      answer: 1, exp: 'LibreOffice is free and open-source, supports common file formats, and meets the requirements legally. Piracy is unacceptable; Notepad lacks features; retail Office is expensive.' },

    /* D4 — Software Development Concepts */
    { domain: 'D4', q: 'A developer is choosing a data type to store a temperature reading such as 72.4 °F. Which type is MOST appropriate?',
      opts: ['Integer', 'Float (or decimal)', 'Boolean', 'String'],
      answer: 1, exp: 'A float (or decimal) stores fractional values like 72.4. An integer would truncate to 72. Booleans store true/false. Storing as a string would prevent math.' },
    { domain: 'D4', q: 'A teacher walks students through this pseudocode: "IF score >= 90 THEN grade = A ELSE IF score >= 80 THEN grade = B ELSE grade = C". Which programming concept does this BEST illustrate?',
      opts: ['Looping', 'Branching (selection)', 'A constant', 'Compilation'],
      answer: 1, exp: 'A chained IF/ELSE selects between paths based on a condition — branching. Looping repeats a block. Constants store unchanging values. Compilation translates source to machine code.' },
    { domain: 'D4', q: 'A small business wants software that they can read the source code of, modify for their needs, and redistribute. Which licensing model BEST fits?',
      opts: ['Closed-source / proprietary', 'Subscription-only SaaS', 'Open-source under a permissive license such as MIT or Apache 2.0', 'Public domain — abandoned only'],
      answer: 2, exp: 'Open-source licenses (MIT, Apache 2.0, GPL) publish source code and grant rights to use, modify, and redistribute. Proprietary closed-source denies source access. SaaS does not give source. Public domain is rare and not what "open-source" means.' },
    { domain: 'D4', q: 'A program needs to perform a calculation 1,000 times with slight variations each time. Which programming structure BEST fits?',
      opts: ['A single function called once', 'A loop (e.g., for loop) that iterates 1,000 times', 'A constant set to 1000', 'A flowchart'],
      answer: 1, exp: 'Loops repeat a block of code a controlled number of times. A for loop with index 0..999 is the canonical way to perform an action 1,000 times.' },

    /* D5 — Data & Database Fundamentals */
    { domain: 'D5', q: 'A new app must store millions of customer records with unpredictable, fast-changing fields (some have an Instagram handle, some do not, some add new fields over time). Which database type is BEST suited?',
      opts: ['Relational (SQL) database with a strict schema', 'Non-relational (NoSQL) document database', 'A flat .csv file', 'A spreadsheet on a shared drive'],
      answer: 1, exp: 'NoSQL document databases (MongoDB, Firestore) store flexible-schema records, ideal when fields vary or evolve. Relational databases require schema migrations for new fields. Flat files do not scale to millions of records.' },
    { domain: 'D5', q: 'A school keeps a Students table and a Grades table. To connect a row in Grades to the student it belongs to, the Grades table includes a column that points at the Students table\'s primary key. What is this column called?',
      opts: ['Composite key', 'Foreign key', 'Index', 'Surrogate key'],
      answer: 1, exp: 'A foreign key in one table references the primary key of another, enforcing the relationship between tables. Indexes speed lookups but do not enforce relationships.' },
    { domain: 'D5', q: 'A small business currently keeps customer info in a single spreadsheet, but duplicate rows and inconsistent spellings are common. Which is the BEST long-term solution?',
      opts: ['Add more columns to the spreadsheet', 'Move the data into a relational database with constraints (unique customer ID, validated fields)', 'Print the spreadsheet weekly', 'Delete the spreadsheet'],
      answer: 1, exp: 'A relational database enforces uniqueness, type checking, and referential integrity. Spreadsheets cannot reliably prevent duplicates or constrain values. Printing or deleting does not solve the underlying data-quality issue.' },
    { domain: 'D5', q: 'A nonprofit must comply with a privacy law that requires deleting personally identifiable information (PII) when no longer needed. Which of the following is MOST clearly PII?',
      opts: ['Aggregated count of donations per zip code', 'A donor\'s full name and email address tied together', 'The list of available product categories', 'A blog post URL'],
      answer: 1, exp: 'PII identifies a specific individual. Name + email is a clear example. Aggregated counts and public product categories are not PII. Always classify before deciding retention.' },

    /* D6 — Security */
    { domain: 'D6', q: 'A user gets a phone call from someone claiming to be IT, asking for their password to "fix an account issue." What is the BEST response?',
      opts: ['Provide the password — IT needs it to fix the issue', 'Provide only the first half of the password', 'Refuse, hang up, and contact IT directly using a known number to verify', 'Reset the password and give the new one to the caller'],
      answer: 2, exp: 'Legitimate IT NEVER needs a user\'s password. Voice phishing (vishing) exploits authority and urgency. The correct response is to hang up and verify through an independent, trusted channel.' },
    { domain: 'D6', q: 'A small business owner reuses the same password across email, banking, and social media. Which BEST describes the risk?',
      opts: ['No risk if the password is strong', 'A breach at any one site exposes every other account that shares that password', 'It only matters if the password is short', 'Banks are immune to this risk'],
      answer: 1, exp: 'Password reuse means a breach anywhere becomes a breach everywhere — credential stuffing attacks try leaked credentials against every popular service. A long, unique-per-account password (managed by a password manager) is the modern guidance.' },
    { domain: 'D6', q: 'A school computer is used by many students throughout the day. Which configuration BEST protects student work and minimizes risk?',
      opts: ['Use a single shared admin account so anyone can fix problems', 'Give each student a non-admin account, with the OS configured to require login and to clear browser data on logout', 'Disable login screens to speed up startup', 'Give every student a copy of the admin password'],
      answer: 1, exp: 'Least privilege (non-admin accounts) prevents one student from changing settings affecting others. Per-user logins separate work and history. Shared admin accounts and disabled logins violate basic security hygiene.' },
    { domain: 'D6', q: 'A user receives an email that LOOKS like it is from their bank, addresses them by first name, and links to a page that exactly matches the bank\'s site. The URL is "bank0famerica-secure.com". What is the SAFEST action?',
      opts: ['Click the link to verify their account', 'Reply with the requested info to be safe', 'Do not click. Navigate to the bank using a known bookmark or official app, then check if there is a real alert', 'Forward the email to friends as a warning'],
      answer: 2, exp: 'Phishing sites can perfectly mirror visual layout. The real signal is the URL — "bank0famerica-secure.com" is NOT bankofamerica.com. Never follow login links from email; navigate independently to verify any real issue.' },
    { domain: 'D6', q: 'A user\'s account on a social platform was breached even though they used a long password. They later realized the password was leaked in an unrelated data breach years ago. Which BEST mitigation would have prevented account takeover?',
      opts: ['A longer password', 'Multi-factor authentication using an authenticator app or hardware key', 'A more frequently changed password', 'Using a personal hotspot'],
      answer: 1, exp: 'Even a strong password is compromised once leaked. MFA adds a second factor (something you have) so a stolen password alone cannot grant access. Password length helps brute-force resistance but not breach exposure.' },
    { domain: 'D6', q: 'A small office gets hit by ransomware. Their critical files are encrypted. The IT manager wants to know the BEST recovery option that does NOT involve paying the attacker.',
      opts: ['Pay the ransom and hope for a decryption key', 'Wipe the affected systems and restore from a known-good, offline backup', 'Negotiate with the attacker for a partial refund', 'Submit the encrypted files to law enforcement and wait'],
      answer: 1, exp: 'A current, offline (or immutable) backup is the recovery path that does not depend on the attacker. Paying funds further crime and does not guarantee recovery. The 3-2-1 backup rule exists specifically for this scenario.' },
    { domain: 'D6', q: 'A user notices a small padlock icon and "https://" in the browser address bar when visiting a site that asks for their credentials. Which statement is the MOST accurate interpretation?',
      opts: ['The site has been verified by the government', 'The connection is encrypted in transit, but the site\'s identity and trustworthiness must still be checked independently', 'The site is malware-free', 'No one can see what you do on this site, including the site itself'],
      answer: 1, exp: 'HTTPS proves the data is encrypted between browser and server, and the certificate matches the domain. It does NOT vouch for whether the site is honest. Phishing sites can get free HTTPS certificates.' },
    { domain: 'D6', q: 'A teacher wants to give students view-only access to a curriculum folder. Which permission level is MOST appropriate?',
      opts: ['Full Control', 'Modify', 'Write', 'Read (or "Viewer")'],
      answer: 3, exp: 'Read-only / Viewer fits "view only." Granting Modify or Full Control violates least privilege. Always start with the minimum permission needed and raise it only when justified.' }
  ]);

  /* ----------------- A+ Core 2 — harder scenario questions ----------------- */
  add('aplus2', [
    /* D1 — Operating Systems */
    { domain: 'D1', q: 'A user reports their Windows 11 laptop boots into a recovery screen after the latest cumulative update. Which is the BEST FIRST action that avoids data loss?',
      opts: ['Reinstall Windows from scratch', 'Choose "Startup Repair," and if that fails, "Uninstall the most recent update" from Advanced options', 'Replace the SSD', 'Reset BIOS to defaults'],
      answer: 1, exp: 'Windows Recovery Environment provides automated repair AND a "Uninstall Updates" option specifically for situations like this. Both preserve user files. Reinstall is last resort; hardware swap is unjustified by an update-related symptom.' },
    { domain: 'D1', q: 'A user wants to make their existing C: partition smaller to create a second partition for personal files without losing data. Which Windows utility is MOST appropriate?',
      opts: ['Format from File Explorer', 'Disk Management → Shrink Volume', 'Reinstall Windows', 'BIOS partitioning tool'],
      answer: 1, exp: 'Shrink Volume in Disk Management resizes a partition while preserving data. Format erases the partition. Reinstall is unnecessary. BIOS does not partition drives.' },
    { domain: 'D1', q: 'A workstation joined to a Windows domain has both a Group Policy Object (GPO) and a local policy setting that conflict on screen-lock timeout. Which value takes effect?',
      opts: ['The local policy', 'The GPO (domain) policy takes precedence over the local policy', 'Whichever was changed last', 'Neither — the system uses defaults when there is a conflict'],
      answer: 1, exp: 'Policy precedence on a domain-joined machine: Local → Site → Domain → Organizational Unit (LSDOU), with later overriding earlier. So domain GPO overrides the local policy for the screen-lock setting.' },
    { domain: 'D1', q: 'A technician needs to view user-specific Windows settings while logged in as that user. Which registry hive contains user-specific configuration for the CURRENT logged-on user?',
      opts: ['HKEY_LOCAL_MACHINE (HKLM)', 'HKEY_CURRENT_USER (HKCU)', 'HKEY_CLASSES_ROOT (HKCR)', 'HKEY_USERS (HKU)'],
      answer: 1, exp: 'HKCU holds the active user\'s settings (mapped from HKEY_USERS\\<SID>). HKLM holds system-wide settings. HKU holds all loaded user profiles. HKCR is a merged view of file associations.' },
    { domain: 'D1', q: 'On a Linux server, a file listing shows: -rwxr-xr-- 1 root admin script.sh. Which BEST describes the permissions?',
      opts: ['Everyone can read, write, and execute the file', 'Owner (root) has full access; group (admin) can read and execute; others can only read', 'Only root can read it', 'Nobody can execute it'],
      answer: 1, exp: 'The 9 permission bits split into owner/group/other (rwx = read/write/execute). rwx r-x r-- = owner full, group read+execute, others read-only. Useful: chmod 754 produces this.' },
    { domain: 'D1', q: 'A technician needs a filesystem that lets a single external drive be read and written by both Windows and macOS without third-party drivers, and supports files larger than 4 GB. Which is BEST suited?',
      opts: ['NTFS', 'FAT32', 'exFAT', 'APFS'],
      answer: 2, exp: 'exFAT is read/write supported natively by Windows and macOS, with no 4 GB file size limit (FAT32\'s biggest constraint). NTFS is Windows-native; macOS reads it but cannot write without third-party drivers. APFS is macOS-native, not natively writable on Windows.' },
    { domain: 'D1', q: 'A user wants to change a Windows service from "Manual" to start automatically at boot. Which tool is BEST suited?',
      opts: ['Task Manager → Startup', 'Services (services.msc) → set Startup Type to Automatic', 'System Configuration → Startup', 'Registry Editor → HKCR'],
      answer: 1, exp: 'services.msc is the dedicated tool for service startup type configuration. Task Manager → Startup manages startup apps, not services. msconfig shows services but does not set type. Direct registry edits are error-prone.' },
    { domain: 'D1', q: 'A new Windows installation needs to start from a USB drive, but the laptop keeps booting from the internal SSD. Where is the BEST place to change this?',
      opts: ['Windows Settings → Update & Security', 'Disk Management', 'UEFI/BIOS firmware settings → Boot Order (or one-time boot menu)', 'Device Manager'],
      answer: 2, exp: 'Boot device order is a firmware (UEFI/BIOS) setting. Use the one-time boot menu (often F12/F11/Esc at POST) or change the persistent boot order in firmware. Windows tools cannot change pre-Windows boot order.' },
    { domain: 'D1', q: 'A user reports their Mac runs hot and the spinning beach ball appears often when starting apps. Activity Monitor shows "mds_stores" using high CPU. Which is the MOST likely cause?',
      opts: ['A failing CPU', 'Spotlight is re-indexing — common after major OS upgrades, large data copies, or when a new drive is connected', 'macOS needs reinstalling', 'The keyboard is broken'],
      answer: 1, exp: 'mds_stores is Spotlight\'s indexing process. High CPU is normal during re-indexing after upgrades or bulk file changes; it settles within hours. Excluding noisy folders in Spotlight preferences mitigates the impact.' },
    { domain: 'D1', q: 'A workstation must be joined to the office Active Directory domain. Which step BEST describes how a technician completes the join from Windows 11 Pro?',
      opts: ['Settings → System → About → Domain or workgroup → change to Domain', 'Type "joindomain" in cmd', 'Disable the local administrator account', 'Reinstall Windows in Pro mode'],
      answer: 0, exp: 'In Windows 11 Pro, domain join is in Settings → System → About → Domain or workgroup (or the older sysdm.cpl → Computer Name → Change). Requires a domain account with join rights. Windows Home cannot join domains.' },

    /* D2 — Security */
    { domain: 'D2', q: 'A user enabled BitLocker on their laptop and now sees a recovery key prompt at boot after a TPM-related firmware change. Where is the BitLocker recovery key MOST likely to be available?',
      opts: ['Printed on the BIOS sticker', 'Saved to the user\'s Microsoft account or, on a corporate device, Azure AD / Active Directory by the IT department', 'In the user\'s Documents folder', 'On the back of the laptop case'],
      answer: 1, exp: 'BitLocker recovery keys are saved (depending on configuration) to the user\'s Microsoft account, Azure AD, on-prem AD, printed/saved to USB, or in a file. Corporate machines almost always escrow to AD/Azure. Document the policy before enabling BitLocker.' },
    { domain: 'D2', q: 'A user opened an email attachment and notices their files now have a .crypt extension and a ransom note appears. What is the MOST appropriate FIRST action?',
      opts: ['Pay the ransom immediately', 'Disconnect the workstation from the network to stop lateral spread, then notify IT/security', 'Reboot and hope it goes away', 'Reply to the ransom email'],
      answer: 1, exp: 'Containment is step 1 of CompTIA\'s incident response: stop the spread. Disconnect from the network (do NOT power off — it may discard forensic memory). Then escalate. Rebooting will not undo encryption.' },
    { domain: 'D2', q: 'A user complains that UAC prompts pop up every time they install software. The IT manager wants to balance security with usability. Which UAC level is the BEST default?',
      opts: ['Always notify', 'Notify me when apps try to make changes (default — secure desktop)', 'Never notify (turn UAC off)', 'Always notify and require a password'],
      answer: 1, exp: 'The default UAC level notifies on app-initiated changes while suppressing notifications for user-initiated settings changes — the right balance for most users. "Always notify" is more secure but annoying; "Never notify" disables UAC and is unsafe.' },
    { domain: 'D2', q: 'A small office is configuring a new wireless access point. Which BEST combination of settings would the technician choose?',
      opts: ['WPA2-Personal + TKIP', 'WPA3-Personal (or WPA2-Personal with AES/CCMP)', 'WEP', 'Open network with hidden SSID'],
      answer: 1, exp: 'WPA3 is current best practice; WPA2-Personal with AES/CCMP is the safe fallback for older clients. TKIP is deprecated. WEP is broken. Hidden SSIDs do not improve security.' },
    { domain: 'D2', q: 'A company wants a stronger second factor for VPN access than SMS. Which option is MOST resistant to common attacks (SIM-swap, phishing, malware)?',
      opts: ['A 6-digit PIN', 'SMS one-time code', 'An authenticator app generating TOTP codes', 'A FIDO2 hardware security key (e.g., YubiKey)'],
      answer: 3, exp: 'FIDO2/WebAuthn hardware keys are resistant to phishing (origin-bound) and not interceptable like SMS. TOTP apps are better than SMS but still phishable. PIN alone is single-factor.' },
    { domain: 'D2', q: 'A company policy locks accounts after 5 failed login attempts for 15 minutes. A user complains they are constantly locked out. The IT team determines the user is mistyping. Which BEST balances security and user productivity?',
      opts: ['Disable account lockout entirely', 'Educate the user, and consider increasing the threshold (e.g., 10 attempts) and/or lowering the lockout duration', 'Reset their password every week', 'Disable the user\'s account'],
      answer: 1, exp: 'Lockout policy must balance brute-force resistance with usability. Adjusting the threshold/duration and educating users is the right response. Disabling lockout opens the door to brute-force; disabling the user is punitive.' },

    /* D3 — Software Troubleshooting */
    { domain: 'D3', q: 'A user reports that their Windows workstation takes 4 minutes to fully boot to a usable desktop. Task Manager → Startup shows 18 enabled apps with several "High" impact. Which is the BEST FIRST action?',
      opts: ['Reinstall Windows', 'Disable unneeded high-impact startup apps and re-test boot time', 'Replace the SSD', 'Run a virus scan only'],
      answer: 1, exp: 'High-impact startup apps directly extend login time. Disabling unnecessary ones is the highest-yield smallest action. Hardware swap or reinstall is far too aggressive when a software change has a measurable impact.' },
    { domain: 'D3', q: 'A specific application keeps crashing immediately after launch. It worked fine until a recent driver update. Other apps are unaffected. Which is the MOST appropriate FIRST step?',
      opts: ['Reinstall Windows', 'Roll back the most recent driver via Device Manager', 'Replace the motherboard', 'Disable the firewall'],
      answer: 1, exp: 'When a driver update precedes a single-app failure, rolling back is the targeted fix. Device Manager → device → Driver → Roll Back. Reinstalling the OS or swapping hardware is excessive for a localized issue.' },
    { domain: 'D3', q: 'A Windows update fails repeatedly with error 0x80070070 ("There is not enough space available on the disk"). Which is the MOST appropriate action?',
      opts: ['Reinstall Windows', 'Free up disk space (delete temporary files, run Disk Cleanup) so the update has room', 'Replace the RAM', 'Disable Windows Update'],
      answer: 1, exp: '0x80070070 means low free space. Windows Update requires several GB of free space, especially for feature updates. Disk Cleanup is the safest, fastest action to free space.' },
    { domain: 'D3', q: 'A user reports their browser homepage and default search engine changed by themselves, and ads now appear on pages that didn\'t have them. Which BEST diagnoses and resolves?',
      opts: ['Replace the laptop', 'Check installed browser extensions for unknown ones, reset browser settings, run anti-malware scan', 'Reinstall Windows immediately', 'Disable the firewall'],
      answer: 1, exp: 'Browser hijack symptoms (changed homepage/search, injected ads) are usually malicious or unwanted browser extensions/PUPs. Remove unknown extensions, reset browser, and scan with a reputable anti-malware tool.' },
    { domain: 'D3', q: 'A user just installed a new piece of software and Windows says it cannot be activated. Other software activates fine. Which is the MOST appropriate FIRST action?',
      opts: ['Reinstall Windows', 'Verify the license key entered, check for an active internet connection, and contact the software vendor for activation issues', 'Replace the network card', 'Reset the BIOS'],
      answer: 1, exp: 'Per-application activation issues are usually the application\'s license server or the entered key — not the OS or hardware. Step 1: validate key + connectivity; step 2: vendor support.' },

    /* D4 — Operational Procedures */
    { domain: 'D4', q: 'An urgent security patch must go to all workstations TODAY due to an active exploit. Which BEST describes the appropriate change-management classification?',
      opts: ['Normal change — submit and wait for the next change-advisory board', 'Emergency change — expedited approval and documentation, with a post-implementation review', 'Pre-approved standard change — no record needed', 'Skip the change-management process to save time'],
      answer: 1, exp: 'Emergency change exists for time-sensitive risks. It uses an expedited approval path but still requires documentation and post-implementation review. Skipping the process violates SOP and audit requirements.' },
    { domain: 'D4', q: 'A workstation is being retired and the hard drive contained sensitive customer PII. Which method is the MOST APPROPRIATE for an SSD?',
      opts: ['Physical degaussing', 'Cryptographic erase (Secure Erase) or physical shredding of the drive', 'Multiple-pass overwrite (DoD 5220.22-M)', 'Format the drive once'],
      answer: 1, exp: 'SSDs do not respond to magnetic degaussing, and multi-pass overwrites are ineffective due to wear-leveling. Cryptographic erase (built into modern SSDs) or physical destruction are the recommended methods.' },
    { domain: 'D4', q: 'A user is leaving the company. Which is the BEST step BEFORE deleting their files?',
      opts: ['Wait one year before any action', 'Confirm the proper records-retention policy, preserve files needed for business continuity, and disable (not delete) the account first', 'Delete everything immediately to free disk space', 'Just lock the account and ignore the files'],
      answer: 1, exp: 'Offboarding follows policy: disable the account on or before last day, retain files per records-retention requirements, then delete according to policy. Premature deletion can destroy required business records.' },
    { domain: 'D4', q: 'A small business takes a full backup weekly and incremental backups daily. The full was Sunday, with incrementals Mon-Fri. The server fails Friday afternoon. To restore, the technician needs to apply:',
      opts: ['Just Friday\'s incremental', 'The Sunday full + every incremental Mon-Fri, in order', 'Just the Sunday full', 'Two random backups'],
      answer: 1, exp: 'An incremental contains changes since the LAST backup of any type. Restore = full + every incremental in order. Differential backups, in contrast, would require only the full + the most recent differential.' },
    { domain: 'D4', q: 'A user reports that a coworker is regularly browsing personal social media on their work laptop. Which BEST describes the FIRST step the user/IT should take per typical company policy?',
      opts: ['Confront the coworker publicly', 'Refer to the company\'s Acceptable Use Policy (AUP) and escalate to the appropriate manager or HR if it is in violation', 'Disable the coworker\'s laptop remotely without notice', 'Post about it on social media'],
      answer: 1, exp: 'AUP violations follow defined HR/management escalation. Bypassing the policy or taking unilateral disciplinary action exposes IT to liability and is inappropriate.' },
    { domain: 'D4', q: 'A technician finishes a complex repair across three workstations. Which document/record is MOST important to update BEFORE closing the ticket?',
      opts: ['The vendor\'s marketing newsletter', 'The incident ticket with detailed actions taken, parts used, and resolution, plus the asset inventory if hardware was replaced', 'A personal blog post', 'The HR file'],
      answer: 1, exp: 'Documentation in the ticket plus asset-inventory updates form the record for future audits, warranty claims, and pattern detection. Skipping this loses institutional knowledge and creates compliance gaps.' }
  ]);

  /* ----------------- A+ Core 2 — additional PBQ ---------------------------- */
  add('aplus2', [
    { type: 'pbq', domain: 'D1',
      q: 'PBQ — Windows boot recovery: A user reports their Windows 11 workstation now reboots into the recovery screen after the latest update. Files must NOT be lost.',
      steps: [
        { kind: 'single',
          text: 'Step 1: From Windows Recovery Environment, what is the BEST FIRST option to try?',
          opts: [
            'Reset this PC → "Remove everything"',
            '"Startup Repair" — automated repair that preserves files',
            'Restart from a Windows install USB and reinstall',
            'Replace the SSD'
          ],
          answer: 1
        },
        { kind: 'multi', selectCount: 2,
          text: 'Step 2: Startup Repair did not resolve the issue. Select TWO appropriate NEXT options (still in WinRE).',
          opts: [
            '"Uninstall Updates" → remove the most recent quality/feature update',
            'Open Command Prompt and run "DISM /Online /Cleanup-Image /RestoreHealth"',
            'Reformat the disk and reinstall Windows fresh',
            'Replace the motherboard',
            'Disable secure boot in BIOS'
          ],
          answer: [0, 1]
        },
        { kind: 'single',
          text: 'Step 3: After recovery, which proactive step BEST reduces recurrence on future updates?',
          opts: [
            'Disable Windows Update entirely',
            'Enable System Restore points so a future bad update is easier to roll back, and verify there is enough disk space for updates',
            'Replace the workstation every six months',
            'Stop scanning for malware'
          ],
          answer: 1
        }
      ],
      exp: 'Windows Recovery flow: Startup Repair → Uninstall Updates → DISM/SFC → System Restore → as a last resort Reset/Reinstall. Most "won\'t boot after update" issues resolve at the Uninstall Updates step. Proactively: enable Restore Points, monitor free space.'
    }
  ]);

  /* ----------------- A+ Core 1 — harder scenario questions ----------------- */
  add('aplus1', [
    /* D1 — Mobile Devices */
    { domain: 'D1', q: 'A user reports their smartphone shows "No SIM" intermittently and then briefly reconnects. The phone is one year old; no recent software updates. Which is the MOST likely cause?',
      opts: ['The phone\'s CPU has failed', 'The SIM card is dirty, damaged, or seated incorrectly in the tray', 'The cellular carrier dropped service', 'The phone needs to be replaced'],
      answer: 1, exp: 'Intermittent "No SIM" with no software change typically points at the SIM tray contact — dirt, oxidation, or a slightly bent tray. Remove and reseat, clean with a microfiber cloth. Carrier outages are global, not intermittent for one phone.' },
    { domain: 'D1', q: 'A salesperson uses a corporate iPad. The IT team must be able to wipe it remotely if it is lost. Which is the BEST tool to enable this?',
      opts: ['Antivirus software', 'Mobile Device Management (MDM) solution', 'A stronger lock-screen password only', 'Disabling Wi-Fi when not in use'],
      answer: 1, exp: 'MDM enrolls corporate-managed devices and provides remote wipe, configuration push, and inventory. A strong password helps but does not enable remote action. Antivirus does not address device loss.' },
    { domain: 'D1', q: 'A user\'s laptop battery now lasts only 30 minutes off the charger; new it lasted 6 hours. Battery health reports "Service Recommended." Which is the MOST appropriate action?',
      opts: ['Replace the entire laptop', 'Replace the battery and recycle the old one', 'Charge to 100% and leave plugged in permanently', 'Disable the touchpad'],
      answer: 1, exp: 'Lithium-ion batteries degrade over hundreds of cycles. A battery service recommendation + dramatically reduced runtime = replacement. The rest of the laptop is fine; whole-machine replacement is wasteful.' },
    { domain: 'D1', q: 'A user takes their laptop into a meeting room and finds the Wi-Fi connects but webpages will not load. Other people in the same room are working fine. Which is the MOST appropriate FIRST step?',
      opts: ['Replace the laptop', 'Toggle Wi-Fi off and on, then verify the device received a valid IP/DNS via ipconfig', 'Power-cycle the corporate router', 'Reinstall the OS'],
      answer: 1, exp: 'Single-device issue + others fine = local to that laptop. Renew DHCP and check ipconfig for a valid address and DNS server. Rebooting the corporate router would punish everyone for one device\'s problem.' },
    { domain: 'D1', q: 'A user reports that their phone shows full Wi-Fi bars but data is very slow. Which is the MOST appropriate FIRST step?',
      opts: ['Replace the phone', 'Check whether the phone\'s mobile-data setting is competing or disabled; verify Wi-Fi vs cellular and run a speed test on each', 'Reset the carrier APN', 'Reinstall every app'],
      answer: 1, exp: 'Full bars only confirm signal strength — not throughput. The device could be on the slowest band, a congested AP, or routing through cellular by mistake. Speed tests on each radio isolate which network is slow.' },

    /* D2 — Networking */
    { domain: 'D2', q: 'A workstation has been assigned an APIPA address (169.254.x.x) instead of a DHCP-assigned address. Which is the MOST likely cause?',
      opts: ['The DHCP server is unreachable or out of leases, and the OS auto-assigned an APIPA address', 'The user changed their wallpaper', 'The CPU has failed', 'The monitor is unplugged'],
      answer: 0, exp: 'A 169.254/16 address means the client tried DHCP, got no response, and self-assigned an Automatic Private IP. Check DHCP scope, server status, and cable/Wi-Fi connectivity to the DHCP server.' },
    { domain: 'D2', q: 'A technician needs to run an Ethernet cable 250 ft (76 m) from the IDF to a workstation through a drop ceiling. Which cable type is the MOST appropriate choice?',
      opts: ['Cat 5e plenum-rated cable, run in the ceiling', 'USB extension', 'Cat 5e PVC-jacketed cable, run loose in the ceiling', 'Coaxial cable'],
      answer: 0, exp: '76 m is within Cat 5e\'s 100 m limit. Cabling run in a plenum space (drop ceiling that carries air return) must use plenum-rated jacket to reduce smoke/fire toxicity. PVC in a plenum is a code violation.' },
    { domain: 'D2', q: 'A SOHO network uses the same SSID name "Office" for both the 2.4 GHz and 5 GHz bands. Users complain devices "stick" to the slower 2.4 GHz band. Which configuration BEST encourages clients to use 5 GHz when available?',
      opts: ['Disable 2.4 GHz entirely', 'Enable band-steering (or use separate SSIDs for 2.4 vs 5 GHz)', 'Hide the SSID', 'Use a longer Wi-Fi password'],
      answer: 1, exp: 'Band-steering preferentially advertises 5 GHz to dual-band clients. Disabling 2.4 GHz cuts off older devices entirely. Separate SSIDs is an alternative when band-steering is not available. Hiding/passwords do not affect band selection.' },
    { domain: 'D2', q: 'A user reports they cannot reach example.com, but they CAN ping 8.8.8.8 successfully from the same machine. Which is the MOST likely cause?',
      opts: ['The local NIC has failed', 'DNS resolution is broken — the configured DNS server cannot answer, or the wrong DNS server is set', 'The cable is unplugged', 'The router is off'],
      answer: 1, exp: 'Layer-3 connectivity to 8.8.8.8 by IP proves the path to the internet works. Failure to resolve a name = DNS-layer issue. Check configured DNS servers (ipconfig /all) and try a public resolver to isolate.' },
    { domain: 'D2', q: 'A small business wants their internal web server reachable from the internet at one specific public IP and port. Which router feature MUST be configured?',
      opts: ['Wi-Fi password rotation', 'Port forwarding from the public IP:port to the internal server\'s LAN IP:port', 'Disabling the firewall', 'Increasing the DHCP lease time'],
      answer: 1, exp: 'Port forwarding (a static NAT rule) maps an inbound public port to an internal host. Disabling the firewall is dangerously broad. Lease times and Wi-Fi passwords do not affect inbound reachability.' },
    { domain: 'D2', q: 'A laptop is connected to a wired switch but is not getting any link light. The cable works on another laptop. Which is the MOST appropriate FIRST step?',
      opts: ['Replace the motherboard', 'Verify the NIC is enabled in OS settings/BIOS; try a different switch port; check the NIC for damage', 'Reinstall Windows', 'Replace the switch'],
      answer: 1, exp: 'Cable is known good (works elsewhere). Narrow to the laptop NIC or the switch port: confirm the NIC is enabled, test a different port, then inspect the RJ-45 jack on the laptop. Bigger swaps come only after these.' },

    /* D3 — Hardware */
    { domain: 'D3', q: 'A technician is building a PC for video editing of 4K footage. Which component combination is MOST appropriate?',
      opts: ['Mid-range CPU, 8 GB RAM, 1 TB HDD, integrated graphics', 'High-core-count CPU, 32+ GB RAM, NVMe SSD for scratch, discrete GPU with hardware video encode', 'Low-end CPU, 4 GB RAM, USB flash drive for editing files, integrated graphics', 'Any combination — 4K editing is light work'],
      answer: 1, exp: '4K timelines benefit from many CPU cores, large RAM for caching frames, NVMe for scratch read/write, and a GPU that hardware-accelerates encoding/decoding. Underspecced parts cause dropped frames and long export times.' },
    { domain: 'D3', q: 'A workstation\'s new GPU draws 250 W under load. The system has a 400 W PSU and other components (CPU, drives, fans) draw about 200 W together. Which is the BEST action BEFORE installing the GPU?',
      opts: ['Install the GPU and hope for the best', 'Replace the PSU with one that has enough headroom (e.g., 750 W) and the required PCIe power connectors', 'Disable the CPU to free up power', 'Add a second 400 W PSU in parallel'],
      answer: 1, exp: 'Total ~450 W demand on a 400 W PSU exceeds capacity and will cause instability, shutdowns, or component damage. Standard rule: pick a PSU with ~30–50% headroom over peak load. Wiring two consumer PSUs in parallel is not a normal solution.' },
    { domain: 'D3', q: 'A user reports their PC randomly freezes for a few seconds and the screen briefly goes black under load. The GPU and CPU temperatures are normal. The user installed a new monitor last week. Which is the MOST likely cause?',
      opts: ['The CPU is failing', 'A bad or undersized DisplayPort/HDMI cable, OR the new monitor\'s GPU driver/refresh-rate mismatch', 'The hard drive is full', 'The keyboard needs new batteries'],
      answer: 1, exp: 'Recent monitor + intermittent black screens points at the new display path. Try a known-good cable, lower the refresh rate, and update GPU drivers. Temps are normal so heat is not the cause.' },
    { domain: 'D3', q: 'A small server has 4 × 4 TB drives. The IT team needs maximum usable space AND fault tolerance for ONE drive failure. Which RAID level BEST fits?',
      opts: ['RAID 0 — maximum space, no fault tolerance', 'RAID 1 — 8 TB usable, mirrors only', 'RAID 5 — 12 TB usable, one-drive fault tolerance', 'RAID 10 — 8 TB usable, mirror+stripe'],
      answer: 2, exp: 'RAID 5 yields (n−1)×drive_size = 12 TB usable from 4 × 4 TB drives, with single-drive fault tolerance. RAID 1 and 10 cap usable capacity at 50%. RAID 0 has no fault tolerance.' },
    { domain: 'D3', q: 'A technician needs to image 200 PCs with the same Windows installation as fast as possible. Which is the BEST approach?',
      opts: ['Install Windows manually on each PC', 'Create a Windows image (golden image), then deploy via PXE/network or imaging tool', 'Buy 200 retail Windows discs and run setup', 'Clone using USB drives plugged into each PC simultaneously'],
      answer: 1, exp: 'Golden-image deployment over the network (PXE + WDS, MDT, or similar) is the standard enterprise approach. It scales linearly and produces consistent installs. Manual installs do not scale.' },
    { domain: 'D3', q: 'A user reports their workstation makes a loud grinding noise from inside the case under load, then quiets down at idle. Temperatures are normal. Which is the MOST likely cause?',
      opts: ['A failing case fan or CPU/GPU fan bearing', 'A virus', 'The OS is corrupted', 'The PSU is overloaded'],
      answer: 0, exp: 'Load-triggered noise + normal temps points at a fan whose bearing is failing. The fan still spins enough to cool, but produces grinding/clicking at speed. Replace the failing fan; a worse failure can take temperatures with it.' },
    { domain: 'D3', q: 'A workstation\'s storage is a single 256 GB SSD that is constantly 95% full. The user complains of slow performance and frequent freezes. Which is the MOST appropriate FIRST step?',
      opts: ['Replace the entire workstation', 'Free up space (10–20% headroom on an SSD is needed for performance), or upgrade to a larger SSD', 'Disable the firewall', 'Add more RAM only'],
      answer: 1, exp: 'SSDs need free space for wear-leveling and write-amplification management. Sustained near-full operation degrades performance. Free space or upgrade size. RAM helps for memory pressure but does not fix a full SSD.' },

    /* D4 — Virtualization & Cloud */
    { domain: 'D4', q: 'A developer wants to run macOS, Windows, and Linux virtual machines on the same desktop simultaneously for cross-platform testing. Which hypervisor type is MOST appropriate?',
      opts: ['Type 1 (bare metal) such as ESXi — best for production servers', 'Type 2 (hosted) such as VMware Workstation or VirtualBox — runs on top of the developer\'s primary OS', 'No hypervisor needed', 'Container engine only'],
      answer: 1, exp: 'Type 2 hypervisors run on top of a host OS, ideal for developer workstations. Type 1 (bare metal) replaces the host OS and is meant for dedicated virtualization hosts.' },
    { domain: 'D4', q: 'A company subscribes to Microsoft 365 (mail, Office apps, OneDrive) for 50 employees. Which cloud service model BEST describes this?',
      opts: ['IaaS — they manage the OS and infrastructure', 'PaaS — they deploy code to a managed platform', 'SaaS — they consume a finished application service over the internet', 'On-premises — installed locally'],
      answer: 2, exp: 'M365 is finished software delivered over the internet — that is the textbook definition of SaaS. IaaS gives raw VMs; PaaS gives a managed app platform; on-premises is local installation.' },
    { domain: 'D4', q: 'A technician needs to revert a VM to its state from 30 minutes ago because a software install went wrong. Which virtualization feature is MOST appropriate?',
      opts: ['Snapshot taken before the install', 'Backup of the VM from last week', 'Live migration', 'Resource reservation'],
      answer: 0, exp: 'A snapshot taken just before the change rolls the VM back to that exact state in seconds. A weekly backup loses six days of legitimate work. Live migration and resource reservation do not undo changes.' },

    /* D5 — Hardware & Network Troubleshooting */
    { domain: 'D5', q: 'A workstation will not POST. Power is on, fans spin, no beeps, no display. The technician removes the GPU and the system continues to POST with onboard graphics. Which is the MOST likely cause?',
      opts: ['The CPU has failed', 'The discrete GPU is failing or its PCIe seating/power is bad', 'The RAM has failed', 'The monitor is the cause'],
      answer: 1, exp: 'Isolating by removing the GPU and getting a successful POST proves the GPU is the cause. Reseat in the PCIe slot, verify PCIe power connectors, and try a known-good GPU if reseating does not help.' },
    { domain: 'D5', q: 'A user\'s desktop runs but Windows hangs randomly with no specific error. Memtest86 reports errors on stick 1. Which is the MOST appropriate action?',
      opts: ['Reinstall Windows', 'Replace stick 1; if the matched-pair, replace the pair to maintain dual-channel', 'Replace the motherboard', 'Replace the CPU'],
      answer: 1, exp: 'Memtest errors on a specific DIMM = bad RAM. Replace the failing module. If the system shipped as a matched pair, replacing the whole kit preserves dual-channel and avoids mismatched timings.' },
    { domain: 'D5', q: 'A laser printer is producing pages with horizontal streaks at regular intervals (e.g., every 3 inches). Which component is MOST likely the cause?',
      opts: ['A bent paper tray', 'A scratched or damaged imaging drum — the defect repeats with each drum rotation', 'The USB cable', 'The power outlet'],
      answer: 1, exp: 'Repeating defects spaced at the circumference of a rotating component point at that component. A scratched drum prints the defect once per revolution. Replace the drum (or drum/toner unit on combo cartridges).' },
    { domain: 'D5', q: 'A workstation\'s clock loses several minutes a day, even after correction. Which component is MOST likely failing?',
      opts: ['CPU', 'CMOS battery (coin-cell on the motherboard)', 'GPU', 'Hard drive'],
      answer: 1, exp: 'Time drift and BIOS settings being lost between power cycles indicate the CMOS coin-cell battery is depleted. Replacement is a few-dollar fix (CR2032 typical).' },
    { domain: 'D5', q: 'A user complains their workstation takes 5 minutes to boot to a usable desktop. Task Manager\'s "Startup impact" shows 14 high-impact apps. Which is the BEST first action?',
      opts: ['Reinstall Windows immediately', 'Disable unnecessary high-impact startup apps and observe boot time', 'Replace the SSD', 'Reset BIOS'],
      answer: 1, exp: 'Many high-impact startup apps directly extend login time. Disabling the ones the user does not need is the smallest, highest-yield change. If still slow afterward, escalate to hardware.' },
    { domain: 'D5', q: 'A user reports their Wi-Fi connection drops only during a specific time of day (around lunch). Which is the MOST likely cause?',
      opts: ['The Wi-Fi card is failing', 'Channel congestion / interference from nearby APs and personal hotspots that come online at that time', 'The router needs a longer password', 'The OS clock is wrong'],
      answer: 1, exp: 'Time-of-day Wi-Fi degradation strongly suggests interference. The 2.4 GHz band especially suffers when more devices wake up. Use a scanner to find clearer channels or move clients to 5 GHz.' },
    { domain: 'D5', q: 'A workstation hangs and reboots specifically while playing 3D games but is stable while running productivity apps. Which is the MOST likely cause?',
      opts: ['Insufficient RAM only', 'GPU overheating, GPU driver issue, or PSU undersized for peak GPU load', 'A keyboard problem', 'The Wi-Fi signal is weak'],
      answer: 1, exp: '3D-only failure points at the GPU subsystem under load: heat, drivers, or power. Check temps with HWMonitor, verify driver version, and confirm PSU wattage and PCIe rails are sufficient.' },
    { domain: 'D5', q: 'A workstation\'s SMART status reports "imminent failure" on the system drive. The user has not noticed any issues. Which is the BEST action?',
      opts: ['Ignore SMART — it is unreliable', 'Back up immediately, then clone or migrate to a new drive', 'Defragment the drive', 'Run chkdsk /r and continue using the drive indefinitely'],
      answer: 1, exp: 'SMART "imminent failure" is the drive\'s controller predicting it from internal counters (reallocated sectors, etc.). Act now: back up critical data, then clone or migrate to a new drive. chkdsk does not extend the drive\'s life meaningfully.' }
  ]);

  /* ----------------- Network+ — harder scenario questions ------------------ */
  add('netplus', [
    /* D1 — Networking Concepts */
    { domain: 'D1', q: 'A user needs to remember the OSI layers. A coworker shows the encapsulation order, top-down, as Data → Segment → Packet → Frame → Bits. Which PDU corresponds to Layer 3 (Network)?',
      opts: ['Frame', 'Packet', 'Segment', 'Bits'],
      answer: 1, exp: 'PDU by layer: L7-L5 = Data, L4 = Segment (TCP) or Datagram (UDP), L3 = Packet, L2 = Frame, L1 = Bits. Routers operate on packets.' },
    { domain: 'D1', q: 'A network technician needs to identify a protocol that runs on TCP port 443. Which is MOST likely?',
      opts: ['DNS', 'HTTPS / TLS', 'SSH', 'SMTP'],
      answer: 1, exp: 'TCP 443 = HTTPS (HTTP over TLS). DNS uses UDP/TCP 53. SSH uses TCP 22. SMTP uses TCP 25/587/465.' },
    { domain: 'D1', q: 'A small office uses 192.168.1.0/24. They need to support more than 250 devices on the same subnet. Which prefix length would BEST accommodate ~500 hosts?',
      opts: ['/24 (256 addresses, 254 usable)', '/23 (512 addresses, 510 usable)', '/22 (1024 addresses, 1022 usable)', '/25 (128 addresses, 126 usable)'],
      answer: 1, exp: '/23 = 9 host bits → 2^9 − 2 = 510 usable hosts. Just enough for 500. /22 would also work but is more than needed. Plan for some growth but not waste.' },
    { domain: 'D1', q: 'Given the IP 10.50.100.130 with subnet mask 255.255.255.192, what is the network ID?',
      opts: ['10.50.100.0', '10.50.100.128', '10.50.100.130', '10.50.100.192'],
      answer: 1, exp: 'Mask 255.255.255.192 = /26, block size 64 in the last octet. Subnets: .0, .64, .128, .192. 130 falls into the .128–.191 range, so the network ID is 10.50.100.128.' },
    { domain: 'D1', q: 'Which CIDR prefix provides EXACTLY 30 usable host addresses per subnet?',
      opts: ['/26 (62 hosts)', '/27 (30 hosts)', '/28 (14 hosts)', '/29 (6 hosts)'],
      answer: 1, exp: '/27 = 5 host bits → 2^5 − 2 = 30 usable. /26 = 62, /28 = 14, /29 = 6. Subnetting math: prefix /(32 − host_bits), usable = 2^host_bits − 2.' },
    { domain: 'D1', q: 'A network admin is documenting a new VLAN setup. Each VLAN is a separate broadcast domain. Which device is REQUIRED to allow traffic between VLANs?',
      opts: ['Layer 2 switch', 'Hub', 'A Layer 3 device (router or L3 switch with inter-VLAN routing)', 'A WAP'],
      answer: 2, exp: 'VLANs isolate broadcast domains at Layer 2. Communication between VLANs requires Layer 3 routing — either a router-on-a-stick (subinterfaces) or an L3 switch with SVIs.' },
    { domain: 'D1', q: 'A company wants to provide highly available public DNS resolution for their internal users. They choose 8.8.8.8 and 1.1.1.1. What kind of service do these provide?',
      opts: ['Recursive DNS resolvers operated by Google and Cloudflare respectively', 'Authoritative-only DNS root servers', 'DHCP relays', 'NTP time servers'],
      answer: 0, exp: '8.8.8.8 (Google Public DNS) and 1.1.1.1 (Cloudflare) are recursive resolvers — they perform full recursion on behalf of clients. Root servers are 13 logical anycast services serving the root zone.' },

    /* D2 — Network Implementation */
    { domain: 'D2', q: 'A technician must connect two switches over a 350-meter run between buildings, with electromagnetic interference present along the path. Which medium is the MOST appropriate?',
      opts: ['Cat 6a copper', 'Multi-mode fiber (OM4)', 'Single-mode fiber', 'Coaxial RG-6'],
      answer: 1, exp: 'Multi-mode fiber supports 350 m easily at 10G; single-mode reaches kilometers but is overkill for 350m. Copper maxes at 100 m and is susceptible to EMI. Coax is not used between switches.' },
    { domain: 'D2', q: 'A network team is configuring a new wireless access point and wants to maximize throughput for laptops within 30 feet while still serving older phones. Which configuration BEST achieves this?',
      opts: ['2.4 GHz only with 40 MHz channels', 'Dual-band: 5 GHz with 80 MHz channels + 2.4 GHz with 20 MHz channels', '6 GHz only (Wi-Fi 6E)', 'Disable Wi-Fi entirely'],
      answer: 1, exp: 'Dual-band coverage: 5 GHz 80 MHz for high throughput on capable devices, 2.4 GHz 20 MHz for older phones and broader penetration. 6 GHz alone excludes older clients.' },
    { domain: 'D2', q: 'A company\'s file server gets a static IPv4 address of 10.10.5.50 via DHCP reservation tied to its MAC. Which BEST describes the benefit over manual static assignment on the server itself?',
      opts: ['Faster boot times only', 'Central management — the address can be changed from the DHCP server without touching the server\'s OS', 'Higher throughput', 'Reduced ARP overhead'],
      answer: 1, exp: 'DHCP reservations give a stable address while keeping central control. If subnetting changes, you update one place (the DHCP scope) instead of editing the server\'s OS network settings.' },
    { domain: 'D2', q: 'A network admin is connecting an Access Layer switch to a Distribution Layer switch and needs to carry traffic for multiple VLANs over a single link. Which BEST describes the required port configuration?',
      opts: ['Access port (default VLAN)', 'Trunk port (802.1Q tagging)', 'Span port', 'Edge port'],
      answer: 1, exp: 'A trunk port carries multiple VLANs via 802.1Q tagging. Access ports belong to a single VLAN. SPAN is for monitoring. Trunks are mandatory between switches when more than one VLAN must traverse the link.' },
    { domain: 'D2', q: 'A new office is being wired. Cat 6a UTP will run from a server room to workstation drops at distances ranging from 20 to 90 meters. Which standard rating supports 10 Gbps over this entire range?',
      opts: ['Cat 5e', 'Cat 6 (limited to 55m at 10G)', 'Cat 6a (full 100m at 10G)', 'Cat 3'],
      answer: 2, exp: 'Cat 6a is rated for 10 Gbps to the full 100 m. Cat 6 supports 10 Gbps only up to ~55 m due to alien crosstalk. Cat 5e tops at 1 Gbps. Cat 3 is voice-grade legacy.' },

    /* D3 — Network Operations */
    { domain: 'D3', q: 'A network admin wants to centrally collect and analyze logs from 50 switches and routers to spot security incidents. Which system is MOST appropriate?',
      opts: ['Local syslog file on each device', 'A SIEM (Security Information and Event Management) platform', 'NTP server', 'A DHCP relay'],
      answer: 1, exp: 'SIEMs aggregate logs from many sources, correlate events, and trigger alerts. Local logs do not provide cross-device correlation. SIEM is the standard for security operations at scale.' },
    { domain: 'D3', q: 'A network team configures SNMPv3 with AES-256 privacy and SHA authentication. What BEST describes the benefit over SNMPv2c?',
      opts: ['Faster polling', 'Per-message authentication AND encryption — SNMPv2c sends community strings in plaintext', 'Lower CPU usage', 'Smaller packet size'],
      answer: 1, exp: 'SNMPv3 adds authentication (sha/md5) and privacy (encryption). v2c uses community strings as essentially clear-text passwords. Authentication prevents tampering; privacy prevents eavesdropping.' },
    { domain: 'D3', q: 'A network admin needs an accurate audit trail showing all configuration changes made on a Cisco switch. Which feature BEST supports this requirement?',
      opts: ['NTP', 'AAA (Authentication, Authorization, Accounting) with logging to a TACACS+ or RADIUS accounting server', 'DHCP snooping', 'Port mirroring'],
      answer: 1, exp: 'AAA accounting records what each authenticated user did. Coupled with NTP-synced timestamps and centralized logging, this provides a complete audit trail. NTP alone only sets clocks.' },
    { domain: 'D3', q: 'A company plans capacity for next year and wants to know if current uplinks need upgrades. Which monitoring approach BEST supports the decision?',
      opts: ['Only spot-check uplink utilization once', 'Collect NetFlow / sFlow / IPFIX data over weeks/months and analyze peak utilization trends', 'Disable monitoring to reduce overhead', 'Watch the link lights'],
      answer: 1, exp: 'Capacity planning needs historical trend data: NetFlow/sFlow aggregated over time shows peaks and patterns. Spot-checks miss peak periods.' },
    { domain: 'D3', q: 'A network admin uses a script to back up router configurations nightly. Which protocol BEST supports SECURE automated copies?',
      opts: ['TFTP — no auth or encryption', 'SCP or SFTP (SSH-based)', 'HTTP', 'FTP (active)'],
      answer: 1, exp: 'SCP/SFTP use SSH for authentication and encryption. TFTP is unauth, FTP is plaintext. For backup scripts touching production gear, SSH-based file transfer is the safe default.' },

    /* D4 — Network Security */
    { domain: 'D4', q: 'A network engineer adds a guest Wi-Fi network. Which combination BEST keeps guest devices off the corporate VLAN AND off other guest devices?',
      opts: ['Same VLAN as employees, no isolation', 'A separate guest VLAN with client isolation (split-tunnel/AP isolation) enabled', 'Hidden SSID with the corporate VLAN', 'No password but on the corporate VLAN'],
      answer: 1, exp: 'Guest VLAN provides corporate separation; client (AP) isolation prevents guest-to-guest communication. Both should be enabled. Hidden SSID is not a security control.' },
    { domain: 'D4', q: 'A company\'s firewall has a rule that allows HTTPS (TCP 443) outbound from any internal source. They want to BLOCK access to one specific malicious domain. Which control is MOST appropriate?',
      opts: ['Block TCP 443 outbound entirely', 'Implement a content/URL filter or DNS sinkhole for that domain', 'Disable the firewall', 'Replace the firewall'],
      answer: 1, exp: 'Domain-level blocking requires layer-7 inspection (URL filtering) or DNS-level interception. Blocking TCP 443 entirely breaks all HTTPS. Firewall replacement is unjustified.' },
    { domain: 'D4', q: 'A security analyst sees repeated authentication failures for the "administrator" account from multiple external IPs. The pattern is one failed attempt every 10 minutes from each IP. What attack type does this BEST describe?',
      opts: ['Slow brute-force / password-spray to evade account lockout', 'Denial of service', 'Phishing', 'SQL injection'],
      answer: 0, exp: 'Many sources, low rate per source = password spray designed to stay under lockout thresholds. Defenses: MFA, account-name obscurity, monitoring at the directory level.' },
    { domain: 'D4', q: 'A network is being designed with defense-in-depth. Which BEST describes the role of an IPS (Intrusion Prevention System) compared to an IDS?',
      opts: ['IPS only logs; IDS blocks', 'IPS is inline and can block matching traffic; IDS is out-of-band and only alerts', 'They are identical', 'IPS is hardware; IDS is software'],
      answer: 1, exp: 'IPS sits inline (in the traffic path) and drops/resets connections matching rules. IDS taps a copy of traffic and only alerts. Both have value; IPS provides active enforcement.' },

    /* D5 — Network Troubleshooting */
    { domain: 'D5', q: 'A user reports they cannot reach the company file server. Other users on the same VLAN reach it fine. From the user\'s workstation, ping to the server times out, but ping to the default gateway succeeds. Which is MOST appropriate FIRST step?',
      opts: ['Reboot every router', 'Check the user\'s workstation arp cache and try clearing it; verify firewall rules on the user\'s workstation', 'Replace the workstation', 'Reinstall Windows'],
      answer: 1, exp: 'Local gateway reachable, server not — and others on same VLAN can reach the server. Issue is isolated to the user\'s workstation: ARP cache poisoning, host-firewall rule, or a route. Replace/reinstall is too aggressive.' },
    { domain: 'D5', q: 'A network engineer runs "tracert 8.8.8.8" and sees the first hop respond, then four hops of "* * *" with no response, then later hops respond normally. What does this MOST likely indicate?',
      opts: ['The internet is broken', 'Some intermediate routers are configured NOT to respond to traceroute (drop ICMP TTL-exceeded) — the path itself is healthy', 'The user\'s NIC is failing', 'DHCP is misconfigured'],
      answer: 1, exp: 'Routers often suppress TTL-exceeded responses for security or rate-limiting reasons. If hops resume normally afterward, the path is fine — the silent hops just won\'t reveal themselves to traceroute.' },
    { domain: 'D5', q: 'A user reports intermittent connectivity from a workstation. Cable tester confirms wiring is good. Switch port stats show frequent CRC errors. Which is the MOST likely cause?',
      opts: ['User error', 'Cable damage too subtle for the basic tester (e.g., kinks, EMI), bad transceiver, or duplex mismatch causing collisions', 'Software bug', 'Server overload'],
      answer: 1, exp: 'CRC errors at the switch point at physical-layer issues: cable damage the basic tester missed, a failing transceiver/SFP, or duplex mismatch. Run a more sophisticated test (cable certifier) and check port duplex.' },
    { domain: 'D5', q: 'A laptop connects to an office Wi-Fi, gets a 169.254.x.x address, and cannot reach anything. Which is the MOST likely cause?',
      opts: ['The CPU is failing', 'DHCP failed — the workstation self-assigned APIPA. Check DHCP server reachability and scope availability', 'The keyboard is broken', 'The OS needs reinstall'],
      answer: 1, exp: 'APIPA (169.254/16) is the auto-assigned address when DHCP cannot be reached or has no leases left. Investigate: is DHCP up? Is the scope exhausted? Is a VLAN/firewall blocking DHCP discovery?' },
    { domain: 'D5', q: 'A user complains that website loads are slow but a wired colleague next to them on the same VLAN sees fast loads. Speed test from the slow user shows 5 Mbps; the colleague\'s tests at 800 Mbps. Which is the MOST appropriate FIRST action?',
      opts: ['Replace the ISP connection', 'Compare the two users\' link speed/duplex settings; verify the slow user\'s NIC is auto-negotiating to gigabit and the patch cable supports it', 'Reset the corporate router', 'Reinstall Windows on the slow user\'s machine'],
      answer: 1, exp: 'Single-user slowness while others on the same LAN are fast = local to that workstation: NIC speed/duplex, cable category, or duplex mismatch with the switch. ISP/router actions are unjustified.' },
    { domain: 'D5', q: 'A network team notices their main internet link is saturating during business hours. Which BEST identifies WHICH applications are consuming the bandwidth?',
      opts: ['Replace the link with a faster one immediately', 'Use NetFlow / sFlow or a packet capture to identify top talkers and applications', 'Restart the firewall', 'Disable employee internet'],
      answer: 1, exp: 'Identify before remediating. NetFlow/sFlow tell you what protocols, sources, and destinations consume bandwidth — letting you apply QoS or block as appropriate. Capacity adds without diagnosis often just delay the next saturation.' },
    { domain: 'D5', q: 'A user reports they can access a SaaS application via web browser but not via the native desktop client. Both are installed on the same laptop. Which is the MOST likely cause?',
      opts: ['The laptop is failing', 'A firewall rule is blocking the TCP port used by the desktop client but not the HTTPS port used by the browser', 'The browser is corrupted', 'The OS needs reinstalling'],
      answer: 1, exp: 'Per-application differentiation usually means port-level filtering. Identify the desktop client\'s required ports (often documented by the vendor) and verify firewall rules allow them outbound.' }
  ]);

  /* ----------------- Network+ — additional PBQ ----------------------------- */
  add('netplus', [
    { type: 'pbq', domain: 'D5',
      q: 'PBQ — Subnetting under load: The IT team must allocate VLANs for a new branch office. Headquarters uses 10.0.0.0/8. The branch will host 3 separate departments needing isolated subnets.',
      steps: [
        { kind: 'single',
          text: 'Step 1: Each department needs to support up to 50 hosts. Which prefix length is the MOST efficient?',
          opts: [
            '/24 (254 hosts) — wastes addresses but easy to remember',
            '/26 (62 hosts) — fits 50 with room to grow',
            '/27 (30 hosts) — too small',
            '/28 (14 hosts) — way too small'
          ],
          answer: 1
        },
        { kind: 'dnd-match',
          text: 'Step 2: The team chose /26. Map each department to its subnet (starting at 10.10.10.0/26).',
          items: [
            { id: 'sales',    label: 'Sales (first /26 block)' },
            { id: 'eng',      label: 'Engineering (second /26 block)' },
            { id: 'ops',      label: 'Operations (third /26 block)' }
          ],
          buckets: [
            { id: 'b1', label: '10.10.10.0 – 10.10.10.63' },
            { id: 'b2', label: '10.10.10.64 – 10.10.10.127' },
            { id: 'b3', label: '10.10.10.128 – 10.10.10.191' }
          ],
          correct: { sales: 'b1', eng: 'b2', ops: 'b3' }
        },
        { kind: 'multi', selectCount: 2,
          text: 'Step 3: Select TWO design BEST practices for the new branch.',
          opts: [
            'Use the same DHCP scope for all VLANs to simplify',
            'Use a separate DHCP scope per VLAN with appropriate default gateway and DNS',
            'Document subnet assignments and reserved address ranges',
            'Skip documentation to save time',
            'Disable the firewall for the new branch'
          ],
          answer: [1, 2]
        }
      ],
      exp: '/26 = block size 64, supports 62 usable hosts per subnet — comfortable margin for 50. Department subnets land at .0/.64/.128/.192 boundaries. Each VLAN needs its own DHCP scope with its gateway; documentation is essential for ongoing management.'
    }
  ]);

})();
