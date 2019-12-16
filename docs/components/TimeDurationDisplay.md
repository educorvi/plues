# TimeDurationDisplay

Zeigt eine Zeitspanne formatiert an (nur Uhrzeiten, wenn beide an selbem Tag, sonst auch Daten)

## Props

<!-- @vuese:TimeDurationDisplay:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|start|Date Objekt, das den Start repräsentiert|`Date`|`true`|-|
|end|Date Objekt, das das Ende repräsentiert|`Date`|`true`|-|
|openEnd|Gibt an, ob das Event ein offenes Ende hat|`Boolean`|`false`|-|
|wholeDay|Gibt an, ob das Event ganztägig ist|`Boolean`|`false`|-|

<!-- @vuese:TimeDurationDisplay:props:end -->


## Methods

<!-- @vuese:TimeDurationDisplay:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getDuration|Hauptmethode, die die formatierte Zeitspanne zuückgibt|-|
|getSingleDate|Gibt das zu einem Date-Objekt gehörende Datum (ohne Uhrzeit) formatiert zurück|Date Objekt, das das auszugebende Datum repräsentiert|
|getSingleTime|Gibt die zu einem Date-Objekt gehörende Uhrzeit formatiert zurück|Date Objekt, das die auszugebende Uhrzeit repräsentiert|
|getTimeDuration|Gibt die beiden Uhrzeiten des Start und Endobjekts zurück (hh:mm - hh:mm)|Date Objekte, das die auszugebenden Uhrzeiten repräsentieren (1. Parameter Start, 2. Ende)|
|formatNumber|Formatiert eine Nummer <100 in ein sicher zweistelliges Format|zu formatierende Nummer|

<!-- @vuese:TimeDurationDisplay:methods:end -->


