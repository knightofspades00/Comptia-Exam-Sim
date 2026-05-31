"""
One-shot extractor: pulls the `const quizQuestions = [...]` array out of each
exam page in ../Comptia-Study-Library and writes a JS module file in
./js/questions/ that registers the pool on window.QUESTION_POOLS.

Run from the Comptia-Exam-Sim folder:
    py _extract_questions.py

The output JS files are not human-edited; re-run this script after editing
the source library to regenerate.

Notes on domain tagging:
  The source library does NOT tag questions with CompTIA domain IDs.  We add
  a placeholder `domain: 'D1'` so the engine has something to bucket on.
  Long-term, questions should be tagged with their real domain (D1..D6 per
  the exam blueprint in js/config.js).  Until then, the domain breakdown on
  results will show D1 only — that is OK and clearly invites tagging later.
"""
from __future__ import annotations
import os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
LIB  = os.path.normpath(os.path.join(ROOT, '..', 'Comptia-Study-Library'))
OUT  = os.path.join(ROOT, 'js', 'questions')

# (sourceFile, targetJsFile, examId, coreFilter)
# coreFilter:
#   None      — keep every question in the source array
#   'core1'   — keep only questions classified as A+ Core 1 (220-1101) topics
#   'core2'   — keep only questions classified as A+ Core 2 (220-1102) topics
# Classification is keyword-based (see CORE_RULES below) and runs against the
# question text + options + explanation.
JOBS = [
    ('techplus.html',     'techplus.js',     'techplus', None),
    ('aplus.html',        'aplus_core1.js',  'aplus1',   'core1'),
    ('aplus.html',        'aplus_core2.js',  'aplus2',   'core2'),
    ('network_plus.html', 'netplus.js',      'netplus',  None),
]

# --- A+ Core 1 vs Core 2 classifier ----------------------------------------
# CompTIA A+ blueprint topics:
#   220-1101 (Core 1): Mobile Devices, Networking, Hardware,
#                      Virtualization & Cloud, Hardware/Network Troubleshooting
#   220-1102 (Core 2): Operating Systems, Security, Software Troubleshooting,
#                      Operational Procedures
# A question can match both lists (e.g. a question about Wi-Fi password
# security). We resolve ties by counting matches: whichever side has more
# distinct keyword hits wins. On a true tie, default to Core 2 (the more
# generic OS/security side).
CORE1_KEYWORDS = [
    # Mobile
    r'\bmobile (?:device|phone)\b', r'\blaptop\b', r'\btablet\b', r'\bsmartphone\b',
    r'\biPhone\b', r'\biPad\b', r'\btether(?:ing)?\b', r'\bhotspot\b',
    r'\bairplane mode\b', r'\bMDM\b', r'\bSIM\b', r'\bdocking station\b',
    # Networking hardware/protocols (Core 1 emphasis)
    r'\brouter\b', r'\bswitch\b', r'\bhub\b', r'\baccess point\b',
    r'\bVLAN\b', r'\bSSID\b', r'\bWi-?Fi\b', r'\b802\.11[a-z]*\b',
    r'\bEthernet\b', r'\bRJ-?45\b', r'\bRJ-?11\b', r'\bfiber\b',
    r'\bcoaxial\b', r'\btwisted pair\b', r'\bcat ?[56]\b',
    r'\bsubnet\b', r'\bIP address\b', r'\bDNS\b', r'\bDHCP\b',
    r'\bNAT\b', r'\bDHCP scope\b', r'\bAPIPA\b',
    r'\bport (?:21|22|23|25|53|80|110|143|443|3389|3306)\b',
    r'\bTCP\b', r'\bUDP\b', r'\bICMP\b',
    # Hardware components
    r'\bCPU\b', r'\bRAM\b', r'\bmotherboard\b', r'\bPSU\b', r'\bpower supply\b',
    r'\bHDD\b', r'\bSSD\b', r'\bNVMe\b', r'\bM\.2\b', r'\bSATA\b', r'\bPCIe\b',
    r'\bGPU\b', r'\bgraphics card\b', r'\bRAID ?[0156]\b', r'\bRAID\b',
    r'\bprinter\b', r'\blaser printer\b', r'\binkjet\b', r'\bthermal printer\b',
    r'\btoner\b', r'\bfuser\b', r'\bdrum\b',
    r'\bBIOS\b', r'\bUEFI\b', r'\bCMOS\b', r'\bPOST\b', r'\bbeep code\b',
    r'\bDDR[345]?\b', r'\bECC memory\b', r'\bDIMM\b', r'\bSO-DIMM\b',
    r'\bcase fan\b', r'\bheatsink\b', r'\bthermal paste\b',
    r'\bcable\b.*\b(VGA|HDMI|DisplayPort|DVI|USB-C)\b',
    # Virtualization & Cloud (Core 1 has it)
    r'\bvirtualization\b', r'\bvirtual machine\b', r'\bhypervisor\b',
    r'\bSaaS\b', r'\bPaaS\b', r'\bIaaS\b', r'\bAWS\b', r'\bAzure\b',
    r'\bcloud\b',
    # Hardware/network troubleshooting
    r'\bno (?:display|power|video|boot)\b', r'\bwon.?t (?:boot|turn on|post)\b',
    r'\bblue screen\b', r'\bBSOD\b.*\b(0x|memory|hardware)\b',
    r'\bsmoke|burning\b', r'\bdistorted (?:image|display)\b',
    r'\bartifact\b', r'\bdead pixel\b', r'\boverheating\b',
]
CORE2_KEYWORDS = [
    # Operating Systems
    r'\bWindows (?:10|11)\b', r'\bmacOS\b', r'\bLinux\b',
    r'\bcommand line\b', r'\bcommand prompt\b', r'\bterminal\b',
    r'\bPowerShell\b', r'\bcmd\b',
    r'\bfile system\b', r'\bNTFS\b', r'\bFAT32\b', r'\bexFAT\b',
    r'\bAPFS\b', r'\bext4\b', r'\bHFS\+\b',
    r'\bregistry\b', r'\btask manager\b', r'\bservices\.msc\b',
    r'\bcontrol panel\b', r'\bsettings app\b', r'\bgroup policy\b',
    r'\bMSConfig\b', r'\bgpedit\b',
    r'\bipconfig\b', r'\bnetstat\b', r'\bping\b', r'\bnslookup\b',
    r'\btracert\b', r'\barp\b', r'\bdism\b', r'\bsfc(?:\s|/scannow)\b',
    r'\bchkdsk\b', r'\bdefrag\b', r'\bsafe mode\b',
    r'\bWindows boot\b', r'\bWindows installation\b',
    r'\bDomain (?:join|controller)\b', r'\bActive Directory\b',
    # Security
    r'\bphishing\b', r'\bvishing\b', r'\bsmishing\b', r'\bspear phishing\b',
    r'\bmalware\b', r'\bvirus\b', r'\bworm\b', r'\bransomware\b',
    r'\bspyware\b', r'\badware\b', r'\btrojan\b', r'\brootkit\b',
    r'\bkeylogger\b', r'\bbotnet\b',
    r'\bfirewall\b', r'\bantivirus\b', r'\bencrypt(?:ion)?\b',
    r'\bBitLocker\b', r'\bFileVault\b',
    r'\bpassword (?:policy|complexity|manager)\b',
    r'\bMFA\b', r'\bmulti-factor\b', r'\b2FA\b',
    r'\bbiometric\b', r'\bauthenti(?:cation|cator)\b',
    r'\bauthoriz(?:ation|ed)\b',
    r'\bVPN\b', r'\bHTTPS\b', r'\bTLS\b', r'\bSSL\b',
    r'\bcertificate\b', r'\bPKI\b',
    r'\bsocial engineering\b', r'\bshoulder surfing\b', r'\btailgating\b',
    r'\bdumpster diving\b', r'\bwhaling\b', r'\bpretexting\b',
    r'\bhardening\b', r'\bPII\b', r'\bleast privilege\b',
    r'\bUAC\b', r'\bSSO\b',
    # Software troubleshooting
    r'\bapp(?:lication)? crash(?:es|ing|ed)?\b',
    r'\bwon.?t open\b', r'\bhangs\b', r'\bfreezes\b',
    r'\breinstall\b.*\b(app|application|software|OS)\b',
    r'\bslow (?:boot|performance|computer)\b',
    r'\bbrowser (?:redirect|hijack|popup)\b',
    r'\bsync issue\b', r'\bemail (?:not|won.?t|fail)\b',
    # Operational procedures
    r'\bchange management\b', r'\basset (?:management|tag|inventory)\b',
    r'\bticket(?:ing)?\b', r'\bknowledge base\b',
    r'\bdocumentation\b', r'\bstandard operating\b', r'\bSOP\b',
    r'\bESD\b', r'\bantistatic\b', r'\bgrounding\b',
    r'\bMSDS\b', r'\bSDS sheet\b', r'\benvironmental\b',
    r'\bregulatory\b', r'\bcompliance\b', r'\bGDPR\b', r'\bHIPAA\b',
    r'\bPCI[ -]?DSS\b', r'\bbackup procedure\b',
    r'\bdisaster recovery\b', r'\bbusiness continuity\b',
    r'\bchain of custody\b', r'\bincident response\b',
    r'\bprofessional(?:ism)?\b', r'\bcustomer (?:communication|service)\b',
    r'\bonboarding\b', r'\boffboarding\b',
    r'\bAUP\b', r'\bacceptable use\b',
]
CORE1_RES = [re.compile(p, re.IGNORECASE) for p in CORE1_KEYWORDS]
CORE2_RES = [re.compile(p, re.IGNORECASE) for p in CORE2_KEYWORDS]

def classify_core(text: str) -> str:
    c1 = sum(1 for r in CORE1_RES if r.search(text))
    c2 = sum(1 for r in CORE2_RES if r.search(text))
    if c1 > c2:  return 'core1'
    if c2 > c1:  return 'core2'
    return 'core2'   # default — Core 2 includes the broader OS/security catch-all

def filter_by_core(chunks: list[str], core: str | None) -> list[str]:
    if core is None: return chunks
    return [c for c in chunks if classify_core(c) == core]

ARRAY_RE = re.compile(r'const\s+quizQuestions\s*=\s*\[', re.S)

def find_array_body(src: str) -> str:
    m = ARRAY_RE.search(src)
    if not m:
        raise RuntimeError('quizQuestions array not found')
    start = m.end() - 1  # position of '['
    depth = 0
    in_str = None
    escape = False
    i = start
    while i < len(src):
        ch = src[i]
        if in_str:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ('"', "'"):
                in_str = ch
            elif ch == '/':
                # skip line and block comments
                if i + 1 < len(src) and src[i+1] == '/':
                    nl = src.find('\n', i)
                    if nl == -1: break
                    i = nl
                elif i + 1 < len(src) and src[i+1] == '*':
                    end = src.find('*/', i+2)
                    if end == -1: break
                    i = end + 1
            elif ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    return src[start:i+1]   # includes outer [ and ]
        i += 1
    raise RuntimeError('unbalanced brackets in quizQuestions')

def split_top_objects(body: str) -> list[str]:
    """Split the array body into individual `{ ... }` chunks at depth 0."""
    assert body[0] == '[' and body[-1] == ']'
    inner = body[1:-1]
    chunks, depth, start = [], 0, None
    in_str = None
    escape = False
    i = 0
    while i < len(inner):
        ch = inner[i]
        if in_str:
            if escape: escape = False
            elif ch == '\\': escape = True
            elif ch == in_str: in_str = None
        else:
            if ch in ('"', "'"):
                in_str = ch
            elif ch == '/' and i + 1 < len(inner) and inner[i+1] == '/':
                nl = inner.find('\n', i)
                if nl == -1: break
                i = nl
                continue
            elif ch == '/' and i + 1 < len(inner) and inner[i+1] == '*':
                end = inner.find('*/', i+2)
                if end == -1: break
                i = end + 2
                continue
            elif ch == '{':
                if depth == 0:
                    start = i
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0 and start is not None:
                    chunks.append(inner[start:i+1])
                    start = None
        i += 1
    return chunks

def slice_chunks(chunks: list[str], spec) -> list[str]:
    """Legacy slice helper, no longer used (kept for backward compat)."""
    if spec is None:
        return chunks
    if isinstance(spec, str):
        return filter_by_core(chunks, spec)
    pos, frac = spec
    n = max(1, int(round(len(chunks) * frac)))
    if pos == 'first':
        return chunks[:n]
    if pos == 'last':
        return chunks[-n:]
    return chunks

# --- Heuristic domain classifier ------------------------------------------
# Until questions are tagged in the source library, we use keyword matching
# on the question text + explanation to assign a domain.  Each exam has its
# own keyword map.  First matching domain wins; if nothing matches, falls
# through to the exam's default domain.

DOMAIN_RULES = {
    'techplus': [
        # Security (D6) — explicit security topics
        ('D6', r'\b(phishing|vishing|smishing|malware|virus|worm|ransomware|spyware|adware|trojan|ddos|firewall|encrypt|encryption|password|MFA|multi-factor|biometric|authenti|authoriz|VPN|HTTPS|TLS|SSL|backup|3-2-1|patch|certificate|cert authority|CIA triad|confidentiality|integrity|availability|hardening|least privilege|PII|social engineering|brute|vulnerab|incognito|social-engin)\b'),
        # Data & DB (D5)
        ('D5', r'\b(SQL|SELECT|INSERT|UPDATE|DELETE|database|relational|NoSQL|MySQL|primary key|foreign key|schema|record|field|table|spreadsheet|metadata|structured data|unstructured data|flat file|DBMS|query)\b'),
        # Software development (D4)
        ('D4', r'\b(loop|function|variable|constant|algorithm|pseudocode|compiler|interpret|markup|HTML|Python|programming|array|branching|selection|boolean|integer|float|string|flowchart|GUI)\b'),
        # Applications & Software (D3)
        ('D3', r'\b(application|operating system|browser|cookie|cache|incognito|driver|OS|Windows|macOS|Linux|Android|iOS|embedded|software|license|open-source|proprietary|subscription|app)\b'),
        # Infrastructure / hardware / networking (D2)
        ('D2', r'\b(CPU|GPU|RAM|HDD|SSD|NVMe|motherboard|peripheral|NIC|port|USB|HDMI|Ethernet|IP address|MAC address|router|switch|modem|DNS|DHCP|Wi-Fi|wireless|Bluetooth|NFC|LAN|WAN|MAN|PAN|cellular|cloud|SaaS|PaaS|IaaS|virtualiz|fault toleran|redundan|hotspot)\b'),
    ],
    'aplus1': [
        ('D5', r'\b(troubleshoot|BSOD|theory of probable cause|verify functionality|document findings|smell|smoke|burning|won.?t turn on|won.?t boot|fan|noise|no display|no power|POST|beep code|self-test|distortion|artifact|spinning|hangs)\b'),
        ('D4', r'\b(cloud|virtualization|VM|virtual machine|hypervisor|SaaS|PaaS|IaaS|AWS|Azure|on-?prem|hybrid cloud)\b'),
        ('D1', r'\b(mobile|laptop|tablet|smartphone|iOS|Android|tether|hotspot|airplane mode|VPN|Bluetooth pairing|MDM|sync)\b'),
        ('D2', r'\b(IP address|subnet|DNS|DHCP|router|switch|hub|access point|VLAN|Wi-?Fi|802\.11|Ethernet|RJ-?45|fiber|coaxial|cable|port \d|TCP|UDP|HTTPS|HTTP|FTP|SSH|SMB|RDP|NAT|firewall|LAN|WAN)\b'),
        ('D3', r'\b(CPU|RAM|motherboard|PSU|power supply|storage|HDD|SSD|NVMe|M\.2|SATA|PCIe|GPU|graphics card|printer|RAID|case fan|cooler|heatsink|thermal paste|BIOS|UEFI|CMOS|monitor|cable|DDR|VRM|expansion|peripheral)\b'),
    ],
    'aplus2': [
        ('D2', r'\b(phishing|vishing|smishing|malware|virus|worm|ransomware|spyware|adware|trojan|firewall|encrypt|password|MFA|biometric|authent|VPN|HTTPS|TLS|SSL|certificate|hardening|PII|social engineering|brute force|attack|exploit|patch)\b'),
        ('D3', r'\b(application crash|won.?t open|hangs|slow|reinstall|repair install|crash|sfc|chkdsk|safe mode|app crash|won.?t install|update|driver issue|update fail|browser)\b'),
        ('D4', r'\b(change management|asset|inventory|ticket|policy|documentation|onboarding|offboarding|knowledge base|standard operating|ESD|environmental|safety|compliance|GDPR|regulatory|backup procedure|disaster recovery|professional|communication|chain of custody)\b'),
        ('D1', r'\b(Windows|macOS|Linux|Android|iOS|operating system|command line|terminal|shell|PowerShell|cmd|file system|NTFS|FAT32|exFAT|APFS|ext4|registry|task manager|services|control panel|settings|GUI|install)\b'),
    ],
    'netplus': [
        ('D5', r'\b(troubleshoot|ping|tracert|traceroute|nslookup|dig|ipconfig|ifconfig|arp|netstat|wireshark|cable tester|loopback|theory of probable cause|verify functionality|connectivity|latency|jitter|packet loss|slow connection|bottleneck|root cause)\b'),
        ('D4', r'\b(VPN|IPSec|SSL|TLS|firewall|ACL|NAC|802\.1X|RADIUS|TACACS|certificate|encryption|phishing|social engineering|on-?path|DDoS|MAC filtering|port security|honeypot|IDS|IPS|VLAN hopping|rogue|hardening|zero trust)\b'),
        ('D3', r'\b(SNMP|syslog|NetFlow|monitor|backup|patch|change management|documentation|topology diagram|baseline|capacity|asset|SLA|MTBF|MTTR|RPO|RTO|policy|procedure)\b'),
        ('D2', r'\b(router|switch|access point|wireless controller|firewall|load balancer|proxy|cable|fiber|coaxial|twisted pair|RJ-?45|patch panel|punch down|crimper|rack|UPS|PoE|VLAN trunk|spanning tree|STP|DHCP|DNS server|reservation|scope)\b'),
        ('D1', r'\b(OSI|TCP/IP|layer [1-7]|IPv4|IPv6|subnet|CIDR|/\d{1,2}\b|address|MAC|frame|packet|segment|port \d|TCP|UDP|HTTP|HTTPS|DNS|DHCP|FTP|SSH|SMTP|POP3|IMAP|topology|hub|bus|star|mesh|protocol)\b'),
    ],
}

import re as _re

# Match a JS object's `q: '...'` field — captures the stem only.
_STEM_RE = _re.compile(r"q:\s*'((?:[^'\\]|\\.)*)'", _re.S)

def classify_domain(text: str, exam_id: str, default: str = 'D1') -> str:
    """
    Two-pass classifier. PASS 1: try every rule against the question STEM
    only. If exactly one matches, take it. PASS 2: if no STEM match (or
    ambiguous), fall back to scoring all matches across the full chunk and
    pick the rule with the most distinct hits, then by rule order on tie.

    This stops decoy keywords in distractor OPTIONS (e.g. "password" as a
    wrong answer in a MAC address question) from pulling the question into
    the Security domain.
    """
    rules = DOMAIN_RULES.get(exam_id, [])
    if not rules:
        return default

    stem_m = _STEM_RE.search(text)
    stem = stem_m.group(1) if stem_m else text

    # PASS 1 — stem only
    stem_hits = [d for d, p in rules if _re.search(p, stem, _re.IGNORECASE)]
    if len(stem_hits) == 1:
        return stem_hits[0]
    if len(stem_hits) > 1:
        # Honor rule order: first rule listed wins.
        for d, _ in rules:
            if d in stem_hits: return d

    # PASS 2 — full chunk, scored
    scores = {}
    for d, p in rules:
        m = _re.findall(p, text, _re.IGNORECASE)
        scores[d] = len(m)
    if max(scores.values(), default=0) > 0:
        # Pick highest score; ties broken by rule order.
        best = max(scores.values())
        for d, _ in rules:
            if scores.get(d, 0) == best:
                return d
    return default

def render_js(exam_id: str, chunks: list[str]) -> str:
    header = (
        '/* AUTO-GENERATED by _extract_questions.py — do not edit by hand. */\n'
        '/* Source: ../Comptia-Study-Library — re-run the extractor to refresh. */\n'
        '/* Domains are heuristically assigned by keyword; review for accuracy. */\n'
        'window.QUESTION_POOLS = window.QUESTION_POOLS || {};\n'
        f"window.QUESTION_POOLS['{exam_id}'] = [\n"
    )
    body_lines = []
    # Use 'domain:' (with colon) so questions whose text literally mentions
    # "domain" (e.g., "Domain Name System") aren't falsely skipped.
    for c in chunks:
        if 'domain:' not in c:
            dom = classify_domain(c, exam_id)
            c = c.rstrip()
            if c.endswith('}'):
                c = c[:-1].rstrip().rstrip(',') + f", domain: '{dom}' }}"
        body_lines.append('  ' + c.replace('\n', '\n  ') + ',')
    return header + '\n'.join(body_lines) + '\n];\n'

def main():
    if not os.path.isdir(LIB):
        print(f'ERROR: source library not found at {LIB}', file=sys.stderr)
        sys.exit(1)
    os.makedirs(OUT, exist_ok=True)
    summary = []
    for src_name, out_name, exam_id, spec in JOBS:
        src_path = os.path.join(LIB, src_name)
        if not os.path.isfile(src_path):
            print(f'  skip: {src_name} (not found)', file=sys.stderr)
            continue
        with open(src_path, encoding='utf-8') as fh:
            src = fh.read()
        body = find_array_body(src)
        chunks = split_top_objects(body)
        sliced = slice_chunks(chunks, spec)
        js = render_js(exam_id, sliced)
        out_path = os.path.join(OUT, out_name)
        with open(out_path, 'w', encoding='utf-8', newline='\n') as fh:
            fh.write(js)
        summary.append(f'{out_name:<24} {exam_id:<10} {len(sliced):>4} questions')
    print('\n'.join(summary))

if __name__ == '__main__':
    main()
