# Agent Skills Resources

Comprehensive reference links for understanding and creating effective Claude skills.

## Official Documentation

### Core Concepts
- **[Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)** - Architecture, progressive disclosure, how skills work
- **[Skills Quickstart](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart)** - Get started with skills in under 10 minutes
- **[Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)** - Authoring guide, conciseness, structure patterns, anti-patterns
- **[Skills API Guide](https://platform.claude.com/docs/en/build-with-claude/skills-guide)** - Using skills programmatically with the API

### API references
**[Create Skill](https://platform.claude.com/docs/en/api/beta/skills/create)**
**[List Skills](https://platform.claude.com/docs/en/api/beta/skills/list)**
**[Get Skill](https://platform.claude.com/docs/en/api/beta/skills/retrieve)**
**[Delete Skill](https://platform.claude.com/docs/en/api/beta/skills/delete)**

## Engineering & Architecture

- **[Engineering Blog: Equipping Agents with Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)** - Design philosophy, progressive disclosure, why skills outperform context stuffing, real-world applications

## Cookbooks & Examples

### Skills Notebooks Series
- **[01: Skills Introduction](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)** - Basic structure, creation process, progressive disclosure patterns
- **[02: Financial Applications](https://platform.claude.com/cookbook/skills-notebooks-02-skills-financial-applications)** - Excel/PowerPoint/PDF skills for finance, multi-skill workflows
- **[03: Custom Development](https://platform.claude.com/cookbook/skills-notebooks-03-skills-custom-development)** - Building organization-specific skills, bundled resources

### Specialized Topics
- **[Frontend Aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)** - Prompting patterns for distinctive UI design, avoiding generic outputs

## Key Concepts from Resources

### Progressive Disclosure (3 Levels)
1. **Metadata** (name + description): Always loaded (~100 words)
2. **SKILL.md body**: Loaded when skill triggers (<5k words)
3. **Bundled resources**: Loaded only as needed (unlimited)

### Resource Types
- **scripts/**: Executable code (Python/Bash) for deterministic operations
- **references/**: Documentation loaded into context as needed
- **assets/**: Files used in output (templates, boilerplate)

### Best Practices Highlights

**From Best Practices Doc:**
- Keep SKILL.md under 500 lines for optimal performance
- Use third-person in description ("This skill should be used when...")
- Write in imperative/infinitive form (verb-first instructions)
- Avoid deeply nested references (keep one level from SKILL.md)
- Include table of contents for files >100 lines
- Test with all models you plan to use (Haiku, Sonnet, Opus)

**From Engineering Blog:**
- Skills enable unbounded scalability vs context-stuffing
- Sorting via token generation is expensive vs deterministic code execution
- Skills package procedural knowledge that no model can fully possess
- "Plan-validate-execute" pattern catches errors early

**From Cookbooks:**
- Build evaluations BEFORE extensive documentation
- Use Claude to help create skills (Claude A writes, Claude B tests)
- Start simple (2-3 sheets/slides), avoid over-complexity
- Skills dramatically reduce token usage (~90% fewer tokens)

### Common Patterns

**Skill Structure Patterns:**
1. **Workflow-Based**: Sequential processes (DOCX skill)
2. **Task-Based**: Tool collections (PDF skill)
3. **Reference/Guidelines**: Standards or specifications (Brand guidelines)
4. **Capabilities-Based**: Integrated systems (Product management)

**Anti-Patterns to Avoid:**
- Assuming tools are installed (specify dependencies)
- Windows-style paths (always use forward slashes)
- Offering too many options (provide default with escape hatch)
- Deeply nested references (Claude may partial-read)
- Time-sensitive information (use "old patterns" section)

## Validation & Packaging

**Utilities in skill-creator:**
- `scripts/init_skill.py` - Initialize new skill structure
- `scripts/quick_validate.py` - Validate skill structure
- `scripts/package_skill.py` - Validate and package for distribution

**Validation Checks:**
- YAML frontmatter format (name, description required)
- Naming conventions (lowercase-alphanumeric-hyphens, max 64 chars)
- Description completeness (max 1024 chars, no XML tags)
- File organization and references

## Use Cases

**Organizational Skills:**
- Brand guidelines and communications
- Project management (OKRs, decision logs)
- Business operations (reports, proposals)

**Personal Skills:**
- Custom document templates
- Data analysis pipelines
- Development workflows

**Examples from Anthropic:**
- **pptx**: PowerPoint creation with layouts
- **xlsx**: Excel with formulas, charts, formatting
- **pdf**: PDF document generation
- **docx**: Word document creation/editing

## Quick Reference

**Skill Creation Process:**
1. Understand with concrete examples
2. Plan reusable contents (scripts/references/assets)
3. Initialize with init_skill.py
4. Edit SKILL.md and resources
5. Package with package_skill.py
6. Iterate based on usage

**YAML Frontmatter Requirements:**
```yaml
---
name: lowercase-alphanumeric-with-hyphens  # Max 64 chars
description: Clear description with trigger conditions  # Max 1024 chars
---
```

**File Size Guidelines:**
- SKILL.md: <500 lines preferred
- References: >100 lines should include table of contents
- Total skill size: <8MB for API uploads

## When to Create Skills

**Good candidates:**
- Repeated workflows with consistent patterns
- Domain-specific knowledge (company schemas, policies)
- Complex multi-step procedures
- Tool integrations requiring specific instructions

**Not good candidates:**
- One-off tasks
- Simple requests already handled well
- Knowledge Claude already possesses
- Rapidly changing information

## Token Efficiency

**Comparison:**
- Manual instructions: 5,000-10,000 tokens per request
- Skills (metadata only): ~100 tokens
- Skills (full load when triggered): ~5,000 tokens
- Savings: ~90% compared to manual approaches

**Best Practices:**
- Stack multiple skills without bloating context
- Each skill costs only metadata until used
- References loaded only when Claude determines need
- Scripts executed without loading into context
